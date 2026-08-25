import { siteContent } from "../site-content";
import { sitePath } from "../site-path";

type SiteHeaderProps = {
  onHomePage?: boolean;
  showMeetings?: boolean;
};

export function SiteHeader({
  onHomePage = false,
  showMeetings = false,
}: SiteHeaderProps) {
  const sectionLink = (section: string) =>
    onHomePage ? `#${section}` : sitePath(`/#${section}`);

  return (
    <header className="site-header">
      <div className="brand" aria-label="Rams Go Green">
        <img
          className="brand-logo"
          src={sitePath("/rams-go-green-logo.png")}
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
            aria-current={onHomePage ? undefined : "page"}
          >
            Leadership
          </a>
        ) : null}
        <a href={sectionLink("instagram")}>Instagram</a>
      </nav>
    </header>
  );
}
