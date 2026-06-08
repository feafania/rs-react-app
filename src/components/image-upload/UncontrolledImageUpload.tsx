import { useState } from 'react';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import './image-upload.css';

type Props = {
  error?: string;
};

export function UncontrolledImageUpload({ error }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);

  const currentErrorMessage = error || localError;
  const hasError = !!currentErrorMessage;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalError(null);

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setLocalError('Only PNG and JPEG files are allowed');
      setImagePreview(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setLocalError(
        `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max 2MB`
      );
      setImagePreview(null);
      return;
    }

    const base64 = await fileToBase64(file);
    setImagePreview(base64);
  };

  const handleClear = () => {
    setImagePreview(null);
    setLocalError(null);
    setInputKey((k) => k + 1);
  };

  return (
    <div className="image-upload-wrapper">
      <input
        key={inputKey}
        id="image"
        name="image"
        type="file"
        className={`form-input image-input ${hasError ? 'form-input-error' : ''}`}
        accept="image/png,image/jpeg"
        onChange={handleChange}
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

      <div className="form-error-container">
        {currentErrorMessage && (
          <p className="form-error">{currentErrorMessage}</p>
        )}
        {!imagePreview && !currentErrorMessage && (
          <p className="form-hint image-hint">PNG or JPEG, max 2MB</p>
        )}
      </div>
    </div>
  );
}
