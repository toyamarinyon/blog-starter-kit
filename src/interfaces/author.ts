export type Author = {
  name: string;
  picture: string;
  bio?: string;
  slug: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
};
