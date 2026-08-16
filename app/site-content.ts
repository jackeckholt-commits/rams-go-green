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
  eyebrow: string;
  tagline: string;
  intro: string;
  instagramHandle: string;
  instagramProfileUrl: string;
  instagramWidgetUrl: string;
  mission: string;
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
  galleryPhotos: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
};

export const siteContent = content as SiteContent;
