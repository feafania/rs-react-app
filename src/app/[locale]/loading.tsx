import { ResultsListSkeleton } from '../../components/skeletons/ResultsListSkeleton';
import { CharacterDetailsSkeleton } from '../../components/skeletons/CharacterDetailsSkeleton';

export default function Loading() {
  return (
    <main className="layout layout-split">
      <div className="main-panel">
        <div
          className="search-section-skeleton"
          style={{
            height: '50px',
            marginBottom: '20px',
            background: '#eaeaea',
            borderRadius: '4px',
          }}
        />
        <ResultsListSkeleton />
      </div>
      <CharacterDetailsSkeleton />
    </main>
  );
}
