import './about-page.css';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function AboutPage() {
  const t = await getTranslations('About');
  return (
    <main className="about-page">
      <div className="about-card">
        <h1>{t('title')}</h1>

        <p>{t('description')}</p>

        <div className="about-author">
          <h2>{t('author')}</h2>
          <p>{t('authorName')}</p>
        </div>

        <div className="about-course">
          <h2>{t('course')}</h2>

          <a
            className="course-link"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="course-logo"
              src="/rs-school-logo.svg"
              alt="RS School"
              width={42}
              height={42}
            />

            <span>{t('courseName')}</span>
          </a>
        </div>
      </div>
    </main>
  );
}
