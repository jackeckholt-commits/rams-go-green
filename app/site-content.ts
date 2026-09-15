import content from "../content/site.json";

export type Meeting = {
  date: string;
  time: string;
  location: string;
  title: string;
  details: string;
  link?: string;
};

type SiteContent = {
  clubName: string;
  logo: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  instagramHandle: string;
  instagramProfileUrl: string;
  instagramEmbedUrl: string;
  mission: string;
  pageText: {
    home: {
      heroTitle: string;
      heroEmphasis: string;
      values: string[];
      aboutLabel: string;
      activitiesLabel: string;
      activitiesTitle: string;
      meetingsLabel: string;
      meetingsTitle: string;
      meetingsIntro: string;
      galleryLabel: string;
      galleryTitle: string;
      instagramLabel: string;
      instagramTitle: string;
      instagramEmpty: string;
    };
    leadership: {
      label: string;
      title: string;
      intro: string;
    };
    footerText: string;
  };
  activities: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  officers: Array<{
    role: string;
    name: string;
    bio: string;
    photo: string;
  }>;
  meetings: {
    googleSheetCsvUrl: string;
    fallback: Meeting[];
  };
  signups: {
    formUrl: string;
    eventDateEntryId: string;
    label: string;
    title: string;
    intro: string;
  };
  galleryPhotos: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
};

export const siteContent: SiteContent = content;
