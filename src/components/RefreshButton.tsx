type RefreshButtonProps = {
  onRefresh: () => void;
  isFetching?: boolean;
};

export function RefreshButton({ onRefresh, isFetching }: RefreshButtonProps) {
  return (
    <button
      type="button"
      onClick={onRefresh}
      className="refresh-button"
      disabled={isFetching}
    >
      {isFetching ? <div className="refresh-spinner" /> : 'Refresh'}
    </button>
  );
}
