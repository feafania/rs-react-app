import './character-details-skeleton.css';

export function CharacterDetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-drag-indicator" />
        <div className="skeleton-close-btn" />
      </div>

      <div className="skeleton-content">
        <div className="skeleton-line title" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
}
