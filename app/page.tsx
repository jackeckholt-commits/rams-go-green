import { siteContent, type Meeting } from "./site-content";

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
  if (name.toLowerCase().startsWith("add ")) return "RG";
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

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rams Go Green home">
          <span className="brand-mark" aria-hidden="true">
            RGG
          </span>
          <span>{siteContent.clubName}</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#meetings">Meetings</a>
          <a href="#officers">Officers</a>
          <a href="#instagram">Instagram</a>
        </nav>
        <a className="header-cta" href={siteContent.joinLink}>
          Join the club
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{siteContent.eyebrow}</p>
          <h1>
            Rams go <em>green.</em>
          </h1>
          <p className="hero-intro">{siteContent.intro}</p>
          <div className="hero-actions">
            <a className="button button-light" href={siteContent.joinLink}>
              Get involved <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#meetings">
              See our next meeting <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="sun-disc" />
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
          <div className="leaf leaf-three" />
          <p>Grow here.<br />Give back.</p>
        </div>

        <div className="meeting-ribbon">
          <span className="ribbon-label">Next up</span>
          <div>
            <strong>{nextMeeting.title}</strong>
            <span>
              {nextMeeting.date} · {nextMeeting.time}
            </span>
          </div>
          <a href="#meetings" aria-label="View meeting details">
            →
          </a>
        </div>
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
          <h2 id="activities-title">Good ideas become real change.</h2>
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

      <section className="meetings section-pad" id="meetings">
        <div className="meetings-copy">
          <p className="section-kicker">Come say hello</p>
          <h2>There&apos;s a seat for you.</h2>
          <p>
            We hold one formal planning meeting each month and aim for two or
            three activities or meetups. No sustainability experience required.
          </p>
          <a className="button button-green" href={siteContent.joinLink}>
            I&apos;m interested <span aria-hidden="true">↗</span>
          </a>
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
                    Meeting details →
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

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
                  <img src={officer.photo} alt={`${officer.name}, ${officer.role}`} />
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
                <img src={photo.src} alt={photo.alt} />
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
            <h2>Fresh from the feed.</h2>
          </div>
          {siteContent.instagramProfileUrl ? (
            <a href={siteContent.instagramProfileUrl} target="_blank" rel="noreferrer">
              {siteContent.instagramHandle} <span aria-hidden="true">↗</span>
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
          <div className="instagram-placeholder">
            <div className="post-card post-one"><span>Share the change.</span></div>
            <div className="post-card post-two"><span>Meet your people.</span></div>
            <div className="post-card post-three"><span>Grow something good.</span></div>
          </div>
        )}
      </section>

      <section className="join section-pad" id="join">
        <div className="join-art" aria-hidden="true">
          <span>✦</span>
        </div>
        <div>
          <p className="section-kicker">Ready when you are</p>
          <h2>Make your time at CSU count.</h2>
          <p>
            Active membership is open to every CSU student with no dues.
            Community partners can join as associate members, and activities
            are open even if you are not yet an active member.
          </p>
          <div className="join-actions">
            {siteContent.instagramProfileUrl ? (
              <a
                className="button button-light"
                href={siteContent.instagramProfileUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow on Instagram <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a className="button button-light" href="#meetings">
                See upcoming events <span aria-hidden="true">↑</span>
              </a>
            )}
            {siteContent.contactEmail ? (
              <a className="text-link" href={`mailto:${siteContent.contactEmail}`}>
                Email the club
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">RGG</span>
          <span>{siteContent.clubName}</span>
        </a>
        <p>A student-led club at Colorado State University.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
