import './results-list-skeleton.css';

export function ResultsListSkeleton() {
  return (
    <div className="results-skeleton">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-checkbox" />
          <div className="skeleton-line short" />
          <div className="skeleton-line long" />
        </div>
      ))}
    </div>
  );
}
