import { useState } from 'react';
import { Link } from 'react-router';
import './not-found-page.css';

const quotes = [
  'I’ve got a bad feeling about this.',
  'These aren’t the droids you’re looking for.',
  'Do. Or do not. There is no try.',
  'In my experience there is no such thing as luck.',
  'The Force will be with you. Always.',
  'Fear is the path to the dark side.',
  'I am one with the Force, and the Force is with me.',
  'Help me, Obi-Wan Kenobi. You’re my only hope.',
];

export function NotFoundPage() {
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <h1>404</h1>
        <p>Page Not Found</p>

        <p className="quote">{quote}</p>

        <Link className="home-link" to="/">
          Return to Home
        </Link>
      </div>
    </main>
  );
}
