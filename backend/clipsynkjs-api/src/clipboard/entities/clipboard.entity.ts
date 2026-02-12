import { Clipgroup } from 'src/clipgroup/entities/clipgroup.entity';
import { User } from 'src/users/entities/user/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Generated,
} from 'typeorm';


// Helper constants
export const TEXT_MIME_TYPES = [
  'text/plain',
//   'text/html',
//   'text/xml',
//   'text/csv',
//   'application/json',
//   'application/xml',
];

export enum StorageStrategy {
  TEXT = 'text',              // text/* or application/json in content column
  BINARY_INLINE = 'binary_inline',  // Binary < 1MB in binaryContent
  BINARY_S3 = 'binary_s3',          // Binary >= 1MB in S3
}

export function isTextMimeType(mimeType: string): boolean {
  return TEXT_MIME_TYPES.some(type => mimeType.startsWith(type));
}

export function getStorageStrategy(mimeType: string, size: number): StorageStrategy {
  if (isTextMimeType(mimeType)) {
    return StorageStrategy.TEXT;
  }
  return size < 1024 * 1024 ? StorageStrategy.BINARY_INLINE : StorageStrategy.BINARY_S3;
}


@Entity()
export class ClipboardEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //TODO must be iso datatime string
    @Column()
    generatedAt: Date;

    @Column()
    deviceFingerprint: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column('bigint')
    clientTimestamp: number;

    @Column('uuid')
    clipboardgroup: Clipgroup;

    // Content identification
    @Column()
    mimeType: string; // text/plain, image/png, video/mp4, etc.

    @Column()
    contentHash: string;

    // Storage strategy
    @Column({
        type: 'enum',
        enum: StorageStrategy,
    })
    storageStrategy: StorageStrategy;


    // TEXT storage (text/*, application/json, application/xml)
    @Column({ type: 'text', nullable: true })
    content: string;

    @Column()
    contentSize: number;


    // BINARY_INLINE storage (< 1MB: images, small files)
    @Column({ type: 'bytea', nullable: true })
    binaryContent: Buffer;


    @Column({ type: 'text', nullable: true })
    s3Url: string; // Pre-signed URL



    // File metadata (for binary content)
    @Column({ nullable: true })
    fileName: string;

    @Column({ nullable: true })
    fileExtension: string;

    // Optional thumbnail (always inline)
    @Column({ type: 'bytea', nullable: true })
    thumbnailData: Buffer;


    // Extended metadata
    @Column({ type: 'jsonb', default: {} })
    metadata: {
        host?: string;
        app?: string;
        // Image metadata
        width?: number;
        height?: number;
        format?: string;
        // Video metadata
        duration?: number;
        codec?: string;
        [key: string]: any;
    };

    @Column({ type: 'jsonb', default: {} })
    vectorClock: Record<string, number>;

    @Column({ type: 'bigint'})
    @Generated('increment')
    sequenceNumber: number;

    @Column({ type: 'text', nullable: true })
    signature: string;
        
    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @Column()
    @ManyToOne(() => User, user => user.clipboardEvents, { onDelete: 'CASCADE' })
    sourceUserId: string

    // Helper methods
    isTextContent(): boolean {
        return this.storageStrategy === StorageStrategy.TEXT;
    }

    isBinaryInline(): boolean {
        return this.storageStrategy === StorageStrategy.BINARY_INLINE;
    }

    isBinaryS3(): boolean {
        return this.storageStrategy === StorageStrategy.BINARY_S3;
    }

    getContent(): string | Buffer | null {
        if (this.isTextContent()) return this.content;
        if (this.isBinaryInline()) return this.binaryContent;
        return null; // S3 requires separate download
    }

}
