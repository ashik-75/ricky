import axios from "axios";

export const getListOfData = async (endpoint: string) => {
  const response = await axios.get(endpoint);

  return response.data;
};

export const getSingleData = async (endpoint: string) => {
  const response = await axios.get(endpoint);

  return response.data;
};
