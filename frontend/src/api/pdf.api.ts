import { http } from "./http";
import {PdfDTO } from "../contracts";

export const fetchProjectPdfs = async (projectId: string): Promise<PdfDTO[]> => {
  const res = await http.get(`/pdfs/project/${projectId}`);
  return res.data;
};

export const downloadPdf = async (id: string): Promise<Blob> => {
  const res = await http.get(`/pdfs/${id}/download`, { responseType: "blob" });
  return res.data;
};