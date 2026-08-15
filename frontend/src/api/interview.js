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

export const getInterviewTopics = async () => {
  const res = await axiosInstance.get("/interviews/topics");
  return res.data;
};

export const addInterviewTopic = async (topicData) => {
  const res = await axiosInstance.post("/interviews/topics", topicData);
  return res.data;
};

export const deleteInterviewTopic = async (id) => {
  const res = await axiosInstance.delete(`/interviews/topics/${id}`);
  return res.data;
};

export const getMCQState = async (id) => {
  const res = await axiosInstance.get(`/interviews/${id}/mcq`);
  return res.data;
};

export const submitMCQAnswer = async (id, questionId, selectedOption) => {
  const res = await axiosInstance.post(`/interviews/${id}/mcq/answer`, { questionId, selectedOption });
  return res.data;
};

