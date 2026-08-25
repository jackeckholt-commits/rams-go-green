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

export async function getMeetings(): Promise<Meeting[]> {
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
