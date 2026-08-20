import type { Metadata } from "next";
import { siteContent } from "../site-content";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

function publicAsset(path: string) {
  return `${siteBasePath}${path}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const title = "Leadership | Rams Go Green";
const description =
  "Meet the student leaders organizing Rams Go Green at Colorado State University.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function LeadershipPage() {
  return (
    <main className="leadership-page">
      <header className="site-header">
        <div className="brand" aria-label="Rams Go Green">
          <span className="brand-mark" aria-hidden="true">
            RGG
          </span>
          <span>{siteContent.clubName}</span>
        </div>
        <nav aria-label="Leadership navigation">
          <a href={publicAsset("/#about")}>About</a>
          <a href={publicAsset("/#instagram")}>Instagram</a>
        </nav>
      </header>

      <section className="leadership-hero section-pad">
        <p className="section-kicker">Our leadership</p>
        <h1>Rams with some plans.</h1>
        <p>Meet the students helping Rams Go Green turn good ideas into action.</p>
      </section>

      <section className="officers leadership-officers section-pad" aria-label="Club officers">
        <div className="officer-grid">
          {siteContent.officers.map((officer) => (
            <article className="officer-card" key={officer.role}>
              <div className="officer-photo">
                {officer.photo ? (
                  <img
                    src={publicAsset(officer.photo)}
                    alt={`${officer.name}, ${officer.role}`}
                  />
                ) : (
                  <span aria-hidden="true">{initials(officer.name)}</span>
                )}
              </div>
              <p className="officer-role">{officer.role}</p>
              <h2>{officer.name}</h2>
              <p>{officer.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p className="footer-name">{siteContent.clubName}</p>
        <p>A student-led club at Colorado State University.</p>
        <a href={publicAsset("/")}>Back to main site</a>
      </footer>
    </main>
  );
}
