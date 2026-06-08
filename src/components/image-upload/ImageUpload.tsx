import { useState } from 'react';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import './image-upload.css';

type Props = {
  onChange: (base64: string) => void;
  onBlur?: () => void;
  error?: string;
};

export function ImageUpload({ onChange, onBlur, error }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);

  const hasError = !!error || !!localError;
  const currentErrorMessage = error || localError;

  const resetInput = () => setInputKey((k) => k + 1);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalError(null);

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setLocalError('Only PNG and JPEG files are allowed');
      onChange('');
      setImagePreview(null);
      resetInput();
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setLocalError(
        `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max 2MB`
      );
      onChange('');
      setImagePreview(null);
      resetInput();
      return;
    }

    const base64 = await fileToBase64(file);
    onChange(base64);
    setImagePreview(base64);
  };

  const handleClear = () => {
    setImagePreview(null);
    setLocalError(null);
    onChange('');
    resetInput();
  };

  return (
    <div className="image-upload-wrapper">
      <input
        key={inputKey}
        id="image"
        type="file"
        className={`form-input image-input ${hasError ? 'form-input-error' : ''}`}
        accept="image/png,image/jpeg"
        onChange={handleChange}
        onBlur={onBlur}
      />
      {imagePreview && (
        <div className="image-preview-wrapper">
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <button
            type="button"
            className="image-clear"
            onClick={handleClear}
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      {currentErrorMessage && (
        <p className="form-error">{currentErrorMessage}</p>
      )}

      {!imagePreview && !currentErrorMessage && (
        <p className="form-hint image-hint">PNG or JPEG, max 2MB</p>
      )}
    </div>
  );
}
