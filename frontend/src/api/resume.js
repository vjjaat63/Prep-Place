import axiosInstance from "../lib/axios";

export const uploadResume = async (formData) => {
  const res = await axiosInstance.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getResume = async () => {
  const response = await axiosInstance.get("/resume");
  return response.data;
};

export const downloadResume = async () => {
  const response = await axiosInstance.get("/resume/download");
  return response.data; // { url, filename }
};

export const getResumeById = async (id) => {
  const res = await axiosInstance.get(`/resume/${id}`);
  return res.data;
};

export const deleteResumeAnalysis = async (id) => {
  const res = await axiosInstance.delete(`/resume/${id}`);
  return res.data;
};
