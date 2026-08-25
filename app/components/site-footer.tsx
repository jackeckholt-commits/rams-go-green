import { siteContent } from "../site-content";
import { sitePath } from "../site-path";

export function SiteFooter({ onHomePage = false }: { onHomePage?: boolean }) {
  return (
    <footer>
      <p className="footer-name">{siteContent.clubName}</p>
      <p>{siteContent.pageText.footerText}</p>
      <a href={onHomePage ? "#top" : sitePath("/")}>
        {onHomePage ? "Back to top" : "Back to main site"}
      </a>
    </footer>
  );
}
