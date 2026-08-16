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
    "We bring Rams together to learn, take action, and make sustainable living feel practical, social, and rewarding.",
  joinLink: "#join",
  contactEmail: "",
  instagramHandle: "@ramsgogreen",
  instagramProfileUrl: "https://www.instagram.com/",
  instagramWidgetUrl: "",
  mission:
    "Rams Go Green helps students turn concern for the planet into visible action at Colorado State. We create welcoming ways to learn new habits, serve our community, and leave campus better than we found it.",
  activities: [
    {
      number: "01",
      title: "Campus action",
      description:
        "Join cleanups, waste-reduction projects, and hands-on events that make a difference you can see.",
    },
    {
      number: "02",
      title: "Sustainable living",
      description:
        "Swap realistic tips on food, transportation, energy, reuse, and low-waste student life.",
    },
    {
      number: "03",
      title: "Community",
      description:
        "Meet curious, motivated Rams and collaborate with people who care about the future of Fort Collins.",
    },
  ],
  officers: [
    {
      role: "President",
      name: "Add president name",
      bio: "Add a short introduction or favorite sustainability goal.",
      photo: "",
    },
    {
      role: "Vice President",
      name: "Add vice president name",
      bio: "Add a short introduction or favorite sustainability goal.",
      photo: "",
    },
    {
      role: "Treasurer",
      name: "Add treasurer name",
      bio: "Add a short introduction or favorite sustainability goal.",
      photo: "",
    },
  ],
  meetings: {
    googleSheetCsvUrl: "",
    fallback: [
      {
        date: "Date coming soon",
        time: "Time coming soon",
        location: "CSU campus — room coming soon",
        title: "Next club meeting",
        details:
          "Come meet the club, hear what we are planning, and help choose our next campus project.",
      },
    ] satisfies Meeting[],
  },
  galleryPhotos: [] as Array<{
    src: string;
    alt: string;
    caption?: string;
  }>,
};
