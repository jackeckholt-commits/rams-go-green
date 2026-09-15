import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { siteContent } from "../site-content";
import { sitePath } from "../site-path";
import { SignupForm } from "./signup-form";

const title = "Activity Signup | Rams Go Green";
const description = siteContent.signups.intro;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function SignupPage() {
  return (
    <main className="signup-page">
      <SiteHeader currentPage="signup" />

      <section className="signup-shell section-pad">
        <div className="signup-page-copy">
          <p className="section-kicker">{siteContent.signups.label}</p>
          <h1>{siteContent.signups.title}</h1>
          <p>{siteContent.signups.intro}</p>
          <a className="text-link" href={sitePath("/")}>
            Back to the main site
          </a>
        </div>

        <SignupForm
          formUrl={siteContent.signups.formUrl}
          eventDateEntryId={siteContent.signups.eventDateEntryId}
        />
      </section>

      <SiteFooter />
    </main>
  );
}
