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

export const downloadResume = async (id = null) => {
  const endpoint = id ? `/resume/download/${id}` : "/resume/download";
  const response = await axiosInstance.get(endpoint);
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
