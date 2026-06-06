import { useFormsStore } from '../../store/useFormsStore';
import './submissions-list.css';

export function SubmissionsList() {
  const submissions = useFormsStore((state) => state.submissions);

  if (submissions.length === 0) {
    return <div className="empty-submissions">No submissions yet</div>;
  }

  return (
    <div className="submissions-grid">
      {submissions.map((s) => (
        <article key={s.id} className="submission-card">
          <h3>{s.name}</h3>

          <p>Email: {s.email}</p>
          <p>Age: {s.age}</p>
          <p>Gender: {s.gender}</p>
          <p>Terms accepted: {s.termsAccepted ? 'Yes' : 'No'}</p>

          <p className="source">Source: {s.source}</p>
        </article>
      ))}
    </div>
  );
}
