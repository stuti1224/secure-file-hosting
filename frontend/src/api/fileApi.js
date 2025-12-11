import api from "./axiosConfig";

// Upload file
export function uploadFile(formData) {
  return api.post("/api/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// Get files of current user
export function getMyFiles() {
  return api.get("/api/files");
}

// Get all public files
export function getPublicFiles() {
  return api.get("/api/files/public");
}

// Delete file by id
export function deleteFile(fileId) {
  return api.delete(`/api/files/${fileId}`);
}

// Download file by id (returns a blob)
export async function downloadFile(fileId) {
  const response = await api.get(`/api/files/download/${fileId}`, {
    responseType: "blob",
  });
  return response.data;
}