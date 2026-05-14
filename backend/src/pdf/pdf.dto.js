export const pdfCreateDTO = (body, uploadStream, userId) => {

  return {
    title: body.title.trim(),
    project: body.project,
    type: body.type,
    gridFsId: uploadStream.id,
    isPublic: body.isPublic ?? false,
    uploadedBy: userId
  };
};

export const pdfToDTO = (pdf) => ({
  id: pdf._id.toString(),
  title: pdf.title,
  type: pdf.type,
  project: pdf.project.toString(),
  isPublic: pdf.isPublic,
  createdAt: pdf.createdAt
});

export const pdfsToDTO = (pdfs) => pdfs.map(pdfToDTO);