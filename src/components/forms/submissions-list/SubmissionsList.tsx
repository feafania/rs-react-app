import { useFormsStore } from '../../../store/useFormsStore.ts';
import './submissions-list.css';

export function SubmissionsList() {
  const submissions = useFormsStore((state) => state.submissions);
  const lastAddedId = useFormsStore((state) => state.lastAddedId);

  if (submissions.length === 0) {
    return <div className="empty-submissions">No submissions yet</div>;
  }

  return (
    <div className="submissions-grid">
      {submissions.map((s) => (
        <article
          key={s.id}
          className={`submission-card ${s.id === lastAddedId ? 'new-card' : ''}`}
        >
          {s.image && (
            <img src={s.image} alt={s.name} className="submission-avatar" />
          )}

          <h3 className="submission-title">{s.name}</h3>

          <div className="submission-fields">
            <div className="field">
              <span className="field-label">Email</span>
              <span className="field-value">{s.email}</span>
            </div>

            <div className="field">
              <span className="field-label">Age</span>
              <span className="field-value">{s.age}</span>
            </div>

            <div className="field">
              <span className="field-label">Gender</span>
              <span className="field-value">{s.gender}</span>
            </div>

            <div className="field">
              <span className="field-label">Country</span>
              <span className="field-value">{s.country}</span>
            </div>
          </div>

          <p className="source">Source: {s.source}</p>
        </article>
      ))}
    </div>
  );
}
