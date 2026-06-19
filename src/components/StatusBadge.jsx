const STATUS_MAP = {
  Applied: 'applied',
  'Under Review': 'review',
  Interview: 'interview',
  Offer: 'offer',
  Rejected: 'rejected',
};

export default function StatusBadge({ status }) {
  const modifier = STATUS_MAP[status] || 'applied';
  return (
    <span className={`status-badge status-badge--${modifier}`}>
      <span className="status-badge__dot" />
      {status}
    </span>
  );
}
