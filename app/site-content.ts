/**
 * RAMS GO GREEN — EASY EDIT FILE
 *
 * Most routine website updates happen here:
 * 1. Change names, wording, links, and meeting details below.
 * 2. Put officer photos in /public/officers and gallery photos in /public/gallery.
 * 3. Add each photo's path to the matching `photo` field or `galleryPhotos` list.
 *
 * To update meetings from Google Sheets, publish a sheet as CSV and paste its
 * public CSV address into `googleSheetCsvUrl`. Use these column headings:
 * date, time, location, title, details, link
 *
 * To show Instagram posts automatically, create a public Instagram feed widget
 * with a service such as LightWidget or Behold, then paste its iframe URL into
 * `instagramWidgetUrl`.
 */

export type Meeting = {
  date: string;
  time: string;
  location: string;
  title: string;
  details: string;
  link?: string;
};

export const siteContent = {
  clubName: "Rams Go Green",
  eyebrow: "A Colorado State University student club",
  tagline: "Small choices. Stronger community. Greener campus.",
  intro:
    "We bring Rams together to care for CSU and Fort Collins through community cleanups, environmental action, and practical sustainability education.",
  joinLink: "#join",
  contactEmail: "",
  instagramHandle: "Instagram coming soon",
  instagramProfileUrl: "",
  instagramWidgetUrl: "",
  mission:
    "Our goal is to give students a direct way to contribute to the communities of Colorado State and Fort Collins by cleaning our surroundings, supporting sustainability efforts, and taking part in environmental activism.",
  activities: [
    {
      number: "01",
      title: "Community cleanups",
      description:
        "Pick up litter after events, join larger cleanup days, and help leave campus and Fort Collins better than we found them.",
    },
    {
      number: "02",
      title: "Education & action",
      description:
        "Build awareness through flyers, conversations, and hands-on activities that make environmentalism approachable.",
    },
    {
      number: "03",
      title: "Local partnerships",
      description:
        "Work with other environmental clubs and support sustainability efforts led by CSU, Fort Collins, and Northern Colorado.",
    },
  ],
  officers: [
    {
      role: "President",
      name: "Jack",
      bio: "Leads meetings, coordinates activities, delegates responsibilities, and keeps the club aligned with CSU requirements and its constitution.",
      photo: "",
    },
    {
      role: "Vice President",
      name: "Sadie",
      bio: "Also serves as treasurer. Supports club planning, coordinates with CSU and the city, maintains financial records and reports, and helps document meetings.",
      photo: "",
    },
  ],
  meetings: {
    googleSheetCsvUrl: "",
    fallback: [
      {
        date: "September 1, 2026",
        time: "To be announced",
        location: "CSU campus — room to be announced",
        title: "First club meeting",
        details:
          "Meet the club, hold officer elections, and plan the first month of Rams Go Green activities.",
      },
      {
        date: "September 5, 2026",
        time: "To be announced",
        location: "CSU campus — meetup point to be announced",
        title: "First cleanup after the football game",
        details:
          "Our first hands-on cleanup event. Sign-up details and the meetup location will be posted before the event.",
      },
    ] satisfies Meeting[],
  },
  galleryPhotos: [] as Array<{
    src: string;
    alt: string;
    caption?: string;
  }>,
};
