# Rams Go Green website

This repository contains the Rams Go Green club website.

**Website:** https://jackeckholt-commits.github.io/rams-go-green/

**Admin page:** https://jackeckholt-commits.github.io/rams-go-green/admin/

Changes committed to the `main` branch are published to the website
automatically by GitHub Pages.

## Quick edit

**[Edit the club information on GitHub](https://github.com/jackeckholt-commits/rams-go-green/edit/main/content/site.json)**

The file `content/site.json` contains the meeting schedule, officer names,
Instagram information, mission, and other routine website text.

To add a meeting:

1. Open the edit link above.
2. Find the empty `"fallback": []` list.
3. Add a meeting inside the brackets using this format:

```json
{
  "date": "September 1, 2026",
  "time": "TBD",
  "location": "TBD",
  "title": "Club meeting",
  "details": "Add the meeting details here.",
  "link": ""
}
```

4. Select **Commit changes** at the bottom of the GitHub page.

Use `TBD` for anything that has not been decided yet. Do not remove commas or
quotation marks. The entire meeting area stays hidden while the list is empty
and appears automatically after the first meeting is added.

## Add officer photos

1. Upload the image to `public/officers` on GitHub.
2. Open `content/site.json`.
3. Change the officer's `"photo"` value to a path such as
   `"/officers/president.jpg"`.

Leave the value empty (`"photo": ""`) to show the officer's initials until a
photo is ready.

## Add club photos

1. Upload each image to `public/gallery`.
2. Add it to the `"galleryPhotos"` list in `content/site.json`.
3. Include a short description in the `"alt"` field.

The gallery stays hidden until at least one photo is added.

## Optional Google Sheets meetings

The website can read meetings from a published Google Sheet instead of the
local list:

1. Copy `public/data/meetings-template.csv` into Google Sheets.
2. Keep the headings `date`, `time`, `location`, `title`, `details`, and `link`.
3. Publish the sheet tab as CSV.
4. Paste its public CSV address into `"googleSheetCsvUrl"` in
   `content/site.json`.

The local meetings remain as a backup if the sheet cannot load.

## Instagram feed

Create a public Instagram feed widget with a provider such as LightWidget or
Behold. Paste the widget iframe URL into `"instagramWidgetUrl"` in
`content/site.json`.

## Run the website locally

Requires Node.js 22.13 or later.

```text
npm install
npm run dev
```

Use `npm test` before publishing an update.
