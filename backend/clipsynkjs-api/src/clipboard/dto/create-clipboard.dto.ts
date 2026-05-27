import { IsEnum, IsOptional, IsDateString, IsString, IsNumber, IsUUID } from 'class-validator'
import { StorageStrategy } from '../entities/clipboard.entity';


export class CreateClipboardDto {

    @IsDateString()
    generatedAt: string;

    @IsString()
    deviceFingerprint: string;

    @IsNumber()
    clientTimestamp: number;

    @IsString()
    mimeType: string;

    @IsOptional()
    @IsUUID()
    clipboardgroup?: string;

    @IsOptional()
    @IsString()
    content: string;

    // ─── contentHash ────────────────────────────────────────────────────────────
    // Optional during early development (single developer, single web client).
    // When to make this required:
    //   - When a second client (CLI, mobile) is introduced, or
    //   - When cross-device sync integrity verification is needed, or
    //   - When content-addressable deduplication at the storage layer matters.
    //
    // What each layer needs to do when enforcing this:
    //
    //   API (this file):
    //     - Remove @IsOptional() and ensure the service does NOT fall back to
    //       computing the hash itself — the client is the source of truth for it.
    //     - Optionally: verify the hash server-side against the content to detect
    //       tampered payloads (for audit trail / tamper-evident use cases).
    //
    //   Web client (PasteZone.tsx):
    //     - Call computeHash() using the Web Crypto API before submitting:
    //         text  → crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    //         binary → crypto.subtle.digest('SHA-256', await blob.arrayBuffer())
    //     - Include the hex-encoded result as `contentHash` in the payload.
    //
    //   CLI client (when built):
    //     - Use Node.js built-in: createHash('sha256').update(content).digest('hex')
    //       (node:crypto — available in all Node.js versions without flags).
    //     - Same algorithm and encoding (hex SHA-256) as the web client so hashes
    //       are comparable across clients in the database.
    //
    // Until then: the service computes a fallback hash from the content when this
    // field is absent. See ClipboardService.create() for the fallback logic.
    // ────────────────────────────────────────────────────────────────────────────
    @IsOptional()
    @IsString()
    contentHash?: string;

    @IsNumber()
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
