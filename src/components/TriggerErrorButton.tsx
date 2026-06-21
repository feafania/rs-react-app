'use client';

interface TriggerErrorButtonProps {
  onClick: () => void;
}

export function TriggerErrorButton({ onClick }: TriggerErrorButtonProps) {
  return (
    <button className="error-button" type="button" onClick={onClick}>
      Trigger Error
    </button>
  );
}
