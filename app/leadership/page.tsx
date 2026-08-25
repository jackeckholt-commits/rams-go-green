import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { siteContent } from "../site-content";
import { sitePath } from "../site-path";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const title = "Leadership | Rams Go Green";
const description = siteContent.pageText.leadership.intro;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function LeadershipPage() {
  const pageText = siteContent.pageText.leadership;

  return (
    <main className="leadership-page">
      <SiteHeader />

      <section className="leadership-hero section-pad">
        <p className="section-kicker">{pageText.label}</p>
        <h1>{pageText.title}</h1>
        <p>{pageText.intro}</p>
      </section>

      <section className="officers leadership-officers section-pad" aria-label="Club officers">
        <div className="officer-grid">
          {siteContent.officers.map((officer) => (
            <article className="officer-card" key={officer.role}>
              <div className="officer-photo">
                {officer.photo ? (
                  <img
                    src={sitePath(officer.photo)}
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

      <SiteFooter />
    </main>
  );
}
