import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fileToBase64 } from '../../../utils/fileToBase64';

describe('fileToBase64', () => {
  const originalFileReader = global.FileReader;

  beforeEach(() => {
    class MockFileReader {
      result: string | null = null;
      error: Error | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL() {
        this.result = 'data:image/png;base64,mockbase64';
        if (this.onload) {
          this.onload();
        }
      }
    }

    global.FileReader = MockFileReader as unknown as typeof FileReader;
  });

  afterEach(() => {
    global.FileReader = originalFileReader;
  });

  it('should convert a file to base64 string successfully', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const result = await fileToBase64(file);
    expect(result).toBe('data:image/png;base64,mockbase64');
  });

  it('should reject the promise when FileReader throws an error', async () => {
    class MockFileReaderWithError {
      result: string | null = null;
      error: Error | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL() {
        this.error = new Error('Read error');
        if (this.onerror) {
          this.onerror();
        }
      }
    }

    global.FileReader = MockFileReaderWithError as unknown as typeof FileReader;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await expect(fileToBase64(file)).rejects.toThrow();
  });
});
