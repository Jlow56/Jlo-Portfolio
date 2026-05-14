export type Project = {
  id: string;
  projectId: string;
  name: string;
  technology: string[];
  category: string;

  cover: string;
  image: string[];

  link?: string;
  gitHub: string;

  shortDescription: string;
  description: string;
  problematic: string;
  solution: string;

  date: string;
};