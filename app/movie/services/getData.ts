import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhZDMxZDdiMTVmMzViZmFhMmRlN2UyYjVmYjMzZSIsInN1YiI6IjYxZTM2ZjczOTQ1MWU3MDA0MWRmMzRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yH-dfh9lUz_b7LVLEEpX0ONPTlQdexvUM4cX_UXK5mg",
};
export const getData = async (endpoint: string) => {
  const url = `${BASE_URL}/${endpoint}`;

  console.log({ url });
  const response = await axios.get(url, {
    headers,
  });

  return response.data;
};
