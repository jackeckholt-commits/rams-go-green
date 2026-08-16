import type { Metadata } from "next";
import { siteContent } from "../site-content";

const repositoryUrl = "https://github.com/jackeckholt-commits/rams-go-green";
const editContentUrl = `${repositoryUrl}/edit/main/content/site.json`;
const officerUploadUrl = `${repositoryUrl}/upload/main/public/officers`;
const galleryUploadUrl = `${repositoryUrl}/upload/main/public/gallery`;
const liveSiteUrl = "https://jackeckholt-commits.github.io/rams-go-green/";

export const metadata: Metadata = {
  title: "Site Admin | Rams Go Green",
  description: "Update the Rams Go Green website through GitHub.",
  robots: { index: false, follow: false },
};

const tasks = [
  {
    number: "01",
    title: "Meetings and site text",
    description:
      "Change meeting dates, times, locations, club wording, contact details, and Instagram settings.",
    links: [{ label: "Edit site details", href: editContentUrl }],
  },
  {
    number: "02",
    title: "Officer photos",
    description:
      "Upload the president or vice president photo, then add its file path to the site details. The officer section appears automatically.",
    links: [
      { label: "Upload officer photos", href: officerUploadUrl },
      { label: "Edit officer details", href: editContentUrl },
    ],
  },
  {
    number: "03",
    title: "Club gallery",
    description:
      "Upload event photos, then add their names and captions. The gallery stays hidden until a photo is listed.",
    links: [
      { label: "Upload club photos", href: galleryUploadUrl },
      { label: "Edit gallery captions", href: editContentUrl },
    ],
  },
  {
    number: "04",
    title: "Instagram feed",
    description:
      "Add the club handle, profile link, and feed widget address when the Instagram account is ready.",
    links: [{ label: "Edit Instagram settings", href: editContentUrl }],
  },
];

export default function AdminPage() {
  const photoCount = siteContent.officers.filter((officer) =>
    officer.photo.trim(),
  ).length;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div className="brand" aria-label="Rams Go Green site manager">
          <span className="brand-mark" aria-hidden="true">RGG</span>
          <span>Site manager</span>
        </div>
        <a className="admin-view-link" href={liveSiteUrl}>
          View live website
        </a>
      </header>

      <div className="admin-shell">
        <section className="admin-intro" aria-labelledby="admin-title">
          <div>
            <p className="section-kicker">Rams Go Green admin</p>
            <h1 id="admin-title">Keep the site current.</h1>
          </div>
          <div className="admin-intro-copy">
            <p>
              Choose what you want to update. GitHub will ask you to sign in,
              and every saved change publishes to the website automatically.
            </p>
            <div className="admin-statuses" aria-label="Current website status">
              <span>{siteContent.meetings.fallback.length} events listed</span>
              <span>{photoCount} officer photos added</span>
              <span>{siteContent.galleryPhotos.length} gallery photos added</span>
            </div>
          </div>
        </section>

        <section className="admin-section" aria-labelledby="updates-title">
          <div className="admin-section-heading">
            <p className="section-kicker">Update the website</p>
            <h2 id="updates-title">What would you like to change?</h2>
          </div>
          <div className="admin-grid">
            {tasks.map((task) => (
              <article className="admin-card" key={task.number}>
                <span className="admin-card-number">{task.number}</span>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="admin-card-actions">
                  {task.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-help" aria-labelledby="help-title">
          <div>
            <p className="section-kicker">How saving works</p>
            <h2 id="help-title">Three quick steps.</h2>
          </div>
          <ol>
            <li><span>1</span>Open the editor or upload page.</li>
            <li><span>2</span>Make the change and select Commit changes.</li>
            <li><span>3</span>Wait about one minute, then refresh the live site.</li>
          </ol>
        </section>

        <aside className="admin-note">
          <strong>Good to know</strong>
          <p>
            This manager is not linked from the public website. Anyone with the
            address can view it, but only people with access to the Rams Go
            Green GitHub repository can save changes.
          </p>
          <a href={`${repositoryUrl}/actions`} target="_blank" rel="noreferrer">
            Check publishing status
          </a>
        </aside>
      </div>
    </main>
  );
}
