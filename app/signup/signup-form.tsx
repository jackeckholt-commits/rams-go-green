"use client";

import { useEffect, useState } from "react";

type SignupFormProps = {
  formUrl: string;
  eventDateEntryId: string;
};

type EventSelection = {
  date: string;
  name: string;
};

function normalizeDate(value: string) {
  const trimmed = value.trim();
  const isoDate = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);

  if (isoDate) {
    return `${isoDate[1]}-${isoDate[2].padStart(2, "0")}-${isoDate[3].padStart(2, "0")}`;
  }

  const parsed = new Date(`${trimmed} 12:00:00`);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildEmbedUrl(
  formUrl: string,
  eventDateEntryId: string,
  selectedDate: string,
) {
  const url = new URL(formUrl);
  url.searchParams.set("embedded", "true");

  if (selectedDate && eventDateEntryId) {
    url.searchParams.set(`entry.${eventDateEntryId}`, selectedDate);
  }

  return url.toString();
}

export function SignupForm({ formUrl, eventDateEntryId }: SignupFormProps) {
  const [selection, setSelection] = useState<EventSelection>({ date: "", name: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelection({
      date: normalizeDate(params.get("date") ?? ""),
      name: params.get("event")?.trim() ?? "",
    });
  }, []);

  const embedUrl = buildEmbedUrl(formUrl, eventDateEntryId, selection.date);

  return (
    <div className="signup-form-wrap">
      {selection.name ? (
        <p className="signup-selection">
          Signing up for <strong>{selection.name}</strong>
          {selection.date ? ` on ${selection.date}` : ""}.
        </p>
      ) : null}
      <iframe
        className="signup-form"
        src={embedUrl}
        title="Rams Go Green activity signup form"
      >
        Loading signup form…
      </iframe>
    </div>
  );
}
