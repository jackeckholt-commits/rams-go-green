import { siteContent } from "../site-content";
import { sitePath } from "../site-path";

type SiteHeaderProps = {
  onHomePage?: boolean;
  showMeetings?: boolean;
  currentPage?: "leadership";
};

export function SiteHeader({
  onHomePage = false,
  showMeetings = false,
  currentPage,
}: SiteHeaderProps) {
  const sectionLink = (section: string) =>
    onHomePage ? `#${section}` : sitePath(`/#${section}`);

  return (
    <header className="site-header">
      <div className="brand" aria-label="Rams Go Green">
        <img
          className="brand-logo"
          src={sitePath(siteContent.logo)}
          alt=""
        />
        <span>{siteContent.clubName}</span>
      </div>
      <nav aria-label="Main navigation">
        <a href={sectionLink("about")}>About</a>
        {onHomePage && showMeetings ? <a href="#meetings">Meetings</a> : null}
        {siteContent.officers.length ? (
          <a
            href={sitePath("/leadership/")}
            aria-current={currentPage === "leadership" ? "page" : undefined}
          >
            Leadership
          </a>
        ) : null}
        <a href={sectionLink("instagram")}>Instagram</a>
        {siteContent.groupMeUrl ? (
          <a
            href={siteContent.groupMeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Join GroupMe
          </a>
        ) : null}
      </nav>
    </header>
  );
}
