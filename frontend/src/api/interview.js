import axiosInstance from "../lib/axios";

export const createInterview = async (data) => {
  const res = await axiosInstance.post("/interviews", data);
  return res.data;
};

export const continueInterview = async (id, message) => {
  const res = await axiosInstance.post(`/interviews/${id}/message`, { message });
  return res.data;
};

export const endInterview = async (id) => {
  const res = await axiosInstance.post(`/interviews/${id}/end`);
  return res.data;
};

export const getInterviewHistory = async () => {
  const res = await axiosInstance.get("/interviews");
  return res.data;
};

export const getInterviewById = async (id) => {
  const res = await axiosInstance.get(`/interviews/${id}`);
  return res.data;
};

export const deleteInterview = async (id) => {
  const res = await axiosInstance.delete(`/interviews/${id}`);
  return res.data;
};
