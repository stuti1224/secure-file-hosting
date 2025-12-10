import api from "./axiosConfig";

export const uploadFile = (formData) =>
  api.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getFiles = () => api.get("/files");

export const downloadFile = (id) => api.get(`/files/download/${id}`, {
  responseType: "blob", // Important to download files
});
