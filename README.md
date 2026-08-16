# Rams Go Green website

This is the club's one-page website. It is designed so routine updates happen
in one file: `app/site-content.ts`.

## Change club information

Open `app/site-content.ts`. The notes at the top point to every editable item:

- officer names, introductions, and photo paths
- meeting dates, times, locations, and links
- Instagram handle, profile, and feed widget
- mission, activities, contact email, and gallery photos

Save the file and the site will refresh while it is running locally.

## Add officer photos

1. Put the image in `public/officers`.
2. Open `app/site-content.ts`.
3. Change that officer's `photo` value to a path such as
   `/officers/president.jpg`.

Leave the value empty to keep the initials placeholder.

## Add club photos

1. Put each image in `public/gallery`.
2. Add it to the `galleryPhotos` list in `app/site-content.ts`.
3. Include a short `alt` description and an optional caption.

The gallery stays hidden until at least one photo is added.

## Update meetings with Google Sheets

The site works with the local meeting list by default. To let a Google Sheet
control the meetings:

1. Copy `public/data/meetings-template.csv` into Google Sheets.
2. Keep the headings `date`, `time`, `location`, `title`, `details`, and `link`.
3. In Google Sheets, publish that tab as a CSV.
4. Paste the public CSV address into `googleSheetCsvUrl` in
   `app/site-content.ts`.

The first row becomes the highlighted next meeting. If the sheet cannot load,
the local fallback meeting is shown so the page never goes blank.

## Show Instagram posts automatically

Instagram does not provide a simple public feed URL. Create a feed with an
Instagram widget provider such as LightWidget or Behold, then paste the widget's
iframe URL into `instagramWidgetUrl` in `app/site-content.ts`. The placeholder
tiles will automatically be replaced by the live feed.

## Run the website

Requires Node.js 22.13 or later.

```text
npm install
npm run dev
```

Use `npm test` before publishing an update.
