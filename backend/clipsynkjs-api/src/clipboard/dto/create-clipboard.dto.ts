import { IsDate, IsEnum, IsOptional} from 'class-validator'
import { StorageStrategy } from '../entities/clipboard.entity';


export class CreateClipboardDto {
    
    @IsDate()
    generatedAt: string;

    deviceFingerprint: string;
    
    clientTimestamp: number;

    mimeType: string;
    
    @IsOptional()
    content: string;

    contentHash: string;

    contentSize: number;

    @IsOptional()
    binaryContent: Buffer;

    @IsOptional()
    s3Url: string;

    @IsOptional()
    fileName: string;

    @IsOptional()
    fileExtension: string;

    @IsOptional()
    thumbnailData: Buffer;

    @IsOptional()
    metadata: Record<string, any>;

    @IsOptional()
    vectorClock: Record<string, number>;

    @IsOptional()
    signature: string;

    @IsOptional()
    sourceUserId: string;

    @IsOptional()
    @IsEnum(StorageStrategy)
    storageStrategy: string;
}
