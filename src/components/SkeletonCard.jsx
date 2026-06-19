export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-circle" />
      <div className="skeleton-line skeleton-line--title" />
      <div className="skeleton-line skeleton-line--sm" />
      <div style={{ marginTop: '1rem' }}>
        <span className="skeleton-line skeleton-line--tag" />
        <span className="skeleton-line skeleton-line--tag" />
      </div>
      <div className="skeleton-line" style={{ marginTop: '1rem', width: '50%' }} />
    </div>
  );
}
