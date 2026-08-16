import { siteContent, type Meeting } from "./site-content";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

function publicAsset(path: string) {
  return `${siteBasePath}${path}`;
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value.trim());
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
}

function parseMeetingsCsv(csv: string): Meeting[] {
  const lines = csv.replace(/\r/g, "").split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  const field = (row: string[], name: string) =>
    row[headers.indexOf(name)]?.trim() ?? "";

  return lines
    .slice(1)
    .map(parseCsvLine)
    .map((row) => ({
      date: field(row, "date"),
      time: field(row, "time"),
      location: field(row, "location"),
      title: field(row, "title") || "Club meeting",
      details: field(row, "details"),
      link: field(row, "link"),
    }))
    .filter((meeting) => meeting.date || meeting.time || meeting.location);
}

async function getMeetings(): Promise<Meeting[]> {
  const sheetUrl = siteContent.meetings.googleSheetCsvUrl.trim();
  if (!sheetUrl) return siteContent.meetings.fallback;

  try {
    const response = await fetch(sheetUrl, { cache: "no-store" });
    if (!response.ok) return siteContent.meetings.fallback;
    const meetings = parseMeetingsCsv(await response.text());
    return meetings.length ? meetings : siteContent.meetings.fallback;
  } catch {
    return siteContent.meetings.fallback;
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function Home() {
  const meetings = await getMeetings();
  const nextMeeting = meetings[0];
  const hasMeetings = meetings.length > 0;

  return (
    <main>
      <header className="site-header">
        <div className="brand" aria-label="Rams Go Green">
          <span className="brand-mark" aria-hidden="true">
            RGG
          </span>
          <span>{siteContent.clubName}</span>
        </div>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          {hasMeetings ? <a href="#meetings">Meetings</a> : null}
          {siteContent.officers.length ? <a href="#officers">Officers</a> : null}
          <a href="#instagram">Instagram</a>
        </nav>
      </header>

      <section className={`hero${hasMeetings ? "" : " hero-no-meetings"}`} id="top">
        <div className="hero-copy">
          <p className="eyebrow">{siteContent.eyebrow}</p>
          <h1>
            Rams go <em>green.</em>
          </h1>
          <p className="hero-intro">{siteContent.intro}</p>
          {hasMeetings ? (
            <div className="hero-actions">
              <a className="text-link" href="#meetings">
                See our next meeting
              </a>
            </div>
          ) : null}
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="sun-disc" />
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
          <div className="leaf leaf-three" />
          <p>Grow here.<br />Give back.</p>
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
        <p className="section-kicker">Why we&apos;re here</p>
        <div>
          <h2>{siteContent.tagline}</h2>
          <p>{siteContent.mission}</p>
        </div>
      </section>

      <section className="activities section-pad" aria-labelledby="activities-title">
        <div className="section-heading">
          <p className="section-kicker">What we do</p>
          <h2 id="activities-title">Make a difference today.</h2>
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

      {hasMeetings ? (
        <section className="meetings section-pad" id="meetings">
          <div className="meetings-copy">
            <p className="section-kicker">Come say hello</p>
            <h2>There&apos;s a seat for you.</h2>
            <p>
              We hold one formal planning meeting each month and aim for two or
              three activities or meetups. No sustainability experience required.
            </p>
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
                    <a className="detail-link" href={meeting.link}>
                      Meeting details
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {siteContent.officers.length ? (
        <section className="officers section-pad" id="officers">
          <div className="section-heading horizontal-heading">
            <div>
              <p className="section-kicker">Meet the team</p>
              <h2>Rams making it happen.</h2>
            </div>
            <p>Say hi at a meeting—we&apos;d love to meet you.</p>
          </div>
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
                <h3>{officer.name}</h3>
                <p>{officer.bio}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {siteContent.galleryPhotos.length ? (
        <section className="gallery section-pad" aria-labelledby="gallery-title">
          <div className="section-heading horizontal-heading">
            <div>
              <p className="section-kicker">Club life</p>
              <h2 id="gallery-title">Growing together.</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {siteContent.galleryPhotos.map((photo) => (
              <figure key={photo.src}>
                <img src={publicAsset(photo.src)} alt={photo.alt} />
                {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="instagram section-pad" id="instagram">
        <div className="instagram-heading">
          <div>
            <p className="section-kicker">Follow along</p>
            <h2>From the feed.</h2>
          </div>
          {siteContent.instagramProfileUrl ? (
            <a href={siteContent.instagramProfileUrl} target="_blank" rel="noreferrer">
              {siteContent.instagramHandle}
            </a>
          ) : (
            <span className="instagram-coming-soon">{siteContent.instagramHandle}</span>
          )}
        </div>
        {siteContent.instagramWidgetUrl ? (
          <iframe
            className="instagram-widget"
            src={siteContent.instagramWidgetUrl}
            title={`${siteContent.clubName} Instagram posts`}
            loading="lazy"
          />
        ) : (
          <div className="instagram-empty">
            <p>No posts at this time.</p>
          </div>
        )}
      </section>

      <footer>
        <p className="footer-name">{siteContent.clubName}</p>
        <p>A student-led club at Colorado State University.</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
