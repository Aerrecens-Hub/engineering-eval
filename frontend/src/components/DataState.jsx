export function DataState({
  loading,
  error,
  empty,
  emptyMessage,
  onRetry,
  children,
}) {
  if (loading) {
    return <p className="state">Loading...</p>;
  }
  if (error) {
    return (
      <div className="state state-error" role="alert">
        <p>{error}</p>
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }
  if (empty) {
    return <p className="state">{emptyMessage}</p>;
  }
  return children;
}
