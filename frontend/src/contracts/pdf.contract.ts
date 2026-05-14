export interface PdfDTO {
  id: string;
  title: string;
  type: "Spécifications" | "Rapport" | "Presentation";
  project: string;
  isPublic: boolean;
  createdAt: string;
}