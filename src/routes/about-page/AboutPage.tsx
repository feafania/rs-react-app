import RsLogo from '../../assets/svg/rs-school-logo.inline.svg';
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
            <img className="course-logo" src={RsLogo} alt="RS School" />

            <span>RS School React Course</span>
          </a>
        </div>
      </div>
    </main>
  );
}
