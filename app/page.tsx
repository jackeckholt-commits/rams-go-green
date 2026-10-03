import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { getMeetings } from "./meetings";
import { siteContent } from "./site-content";
import { sitePath } from "./site-path";

export default async function Home() {
  const meetings = await getMeetings();
  const nextMeeting = meetings[0];
  const hasMeetings = meetings.length > 0;
  const pageText = siteContent.pageText.home;

  return (
    <main>
      <SiteHeader onHomePage showMeetings={hasMeetings} />

      <section className={`hero${hasMeetings ? "" : " hero-no-meetings"}`} id="top">
        <div className="hero-copy">
          <p className="eyebrow">{siteContent.eyebrow}</p>
          <h1>
            {pageText.heroTitle} <em>{pageText.heroEmphasis}</em>
          </h1>
          <p className="hero-intro">{siteContent.intro}</p>
          <ul className="hero-values" aria-label="Club values">
            {pageText.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          {hasMeetings ? (
            <div className="hero-actions">
              <a className="text-link" href="#meetings">
                See our next meeting
              </a>
            </div>
          ) : null}
        </div>

        <div className="hero-art">
          <img
            className="hero-logo"
            src={sitePath(siteContent.logo)}
            alt="Rams Go Green logo"
          />
        </div>

        {nextMeeting ? (
          <div className="meeting-ribbon">
            <span className="ribbon-label">Next up</span>
            <div>
              <strong>{nextMeeting.title}</strong>
              <span>
                {nextMeeting.date} · {nextMeeting.time}
              </span>
            </div>
            <a href="#meetings" aria-label="View meeting details">
              View
            </a>
          </div>
        ) : null}
      </section>

      <section className="statement section-pad" id="about">
        <p className="section-kicker">{pageText.aboutLabel}</p>
        <div>
          <h2>{siteContent.tagline}</h2>
          <p>{siteContent.mission}</p>
        </div>
      </section>

      <section className="activities section-pad" aria-labelledby="activities-title">
        <div className="section-heading">
          <p className="section-kicker">{pageText.activitiesLabel}</p>
          <h2 id="activities-title">{pageText.activitiesTitle}</h2>
        </div>
        <div className="activity-grid">
          {siteContent.activities.map((activity) => (
            <article key={activity.number} className="activity-card">
              <span>{activity.number}</span>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="groupme-callout section-pad" id="join">
        <div>
          <p className="section-kicker">{pageText.joinLabel}</p>
          <h2>{pageText.joinTitle}</h2>
        </div>
        <div className="groupme-callout-copy">
          <p>{pageText.joinIntro}</p>
          <a
            className="button button-green"
            href={siteContent.groupMeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Join the GroupMe
          </a>
        </div>
      </section>

      {hasMeetings ? (
        <section className="meetings section-pad" id="meetings">
          <div className="meetings-copy">
            <p className="section-kicker">{pageText.meetingsLabel}</p>
            <h2>{pageText.meetingsTitle}</h2>
            <p>{pageText.meetingsIntro}</p>
          </div>
          <div className="meeting-list">
            {meetings.map((meeting, index) => (
              <article className="meeting-card" key={`${meeting.date}-${index}`}>
                <div className="meeting-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="meeting-date">{meeting.date}</p>
                  <h3>{meeting.title}</h3>
                  <p>{meeting.details}</p>
                  <dl>
                    <div>
                      <dt>Time</dt>
                      <dd>{meeting.time}</dd>
                    </div>
                    <div>
                      <dt>Place</dt>
                      <dd>{meeting.location}</dd>
                    </div>
                  </dl>
                  {meeting.link ? (
                    <div className="meeting-links">
                      <a className="detail-link" href={meeting.link}>
                        Meeting details
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {siteContent.galleryPhotos.length ? (
        <section className="gallery section-pad" aria-labelledby="gallery-title">
          <div className="section-heading horizontal-heading">
            <div>
              <p className="section-kicker">{pageText.galleryLabel}</p>
              <h2 id="gallery-title">{pageText.galleryTitle}</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {siteContent.galleryPhotos.map((photo) => (
              <figure key={photo.src}>
                <img src={sitePath(photo.src)} alt={photo.alt} />
                {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="instagram section-pad" id="instagram">
        <div className="instagram-layout">
          <div className="instagram-copy">
            <p className="section-kicker">{pageText.instagramLabel}</p>
            <h2>{pageText.instagramTitle}</h2>
            <p className="instagram-intro">
              See club projects, meeting moments, and campus action as it happens.
            </p>
            <div className="instagram-profile">
              <img src={sitePath(siteContent.logo)} alt="" />
              <div>
                <span>Instagram</span>
                <strong>@{siteContent.instagramHandle}</strong>
              </div>
            </div>
            {siteContent.instagramProfileUrl ? (
              <a
                className="instagram-profile-link"
                href={siteContent.instagramProfileUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow the club
              </a>
            ) : (
              <span className="instagram-coming-soon">@{siteContent.instagramHandle}</span>
            )}
          </div>

          <div className="instagram-post-shell">
            <div className="instagram-post-meta">
              <span>Latest post</span>
              {siteContent.instagramProfileUrl ? (
                <a href={siteContent.instagramProfileUrl} target="_blank" rel="noreferrer">
                  Open on Instagram
                </a>
              ) : null}
            </div>
            {siteContent.instagramEmbedUrl ? (
              <iframe
                className="instagram-widget"
                src={siteContent.instagramEmbedUrl}
                title={`${siteContent.clubName} latest Instagram post`}
                loading="lazy"
                scrolling="no"
              />
            ) : (
              <div className="instagram-empty">
                <p>{pageText.instagramEmpty}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter onHomePage />
    </main>
  );
}
