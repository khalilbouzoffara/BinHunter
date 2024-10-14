import axios from 'axios';

const API_BASE_URL = "http://localhost:5000"; // Base URL of the Flask backend

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const progress = Math.round((event.loaded * 100) / event.total);
        console.log(`Upload Progress: ${progress}%`);
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
