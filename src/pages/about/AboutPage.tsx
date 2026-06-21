import Image from 'next/image';
import './about-page.css';

export function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-card">
        <h1>About this app</h1>

        <p>
          This application allows you to search Star Wars characters using SWAPI
          with pagination and routing.
        </p>

        <div className="about-author">
          <h2>Author</h2>
          <p>Tatsiana Kashko</p>
        </div>

        <div className="about-course">
          <h2>Course</h2>

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

            <span>RS School React Course</span>
          </a>
        </div>
      </div>
    </main>
  );
}
