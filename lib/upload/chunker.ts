export const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export interface FileChunk {
    partNumber: number;
    chunk: Blob;
}

/**
 * Splits a standard browser File into an array of 5MB chunks.
 * Uses `Blob.slice()` to ensure memory efficiency (avoiding holding duplicates in RAM).
 */
export function splitFileIntoChunks(file: File): FileChunk[] {
    const chunks: FileChunk[] = [];
    let offset = 0;
    let partNumber = 1;

    while (offset < file.size) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        chunks.push({ partNumber, chunk });
        offset += CHUNK_SIZE;
        partNumber++;
    }

    return chunks;
}
