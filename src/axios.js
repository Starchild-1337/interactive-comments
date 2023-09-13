import axios from "axios";
import { useGlobalContext } from "./context";

export const useCustomFetch = () => {
  const {
    user: { token },
  } = useGlobalContext();

  const fetch = (endpoint, method, data) => {
    return axios({
      url: endpoint,
      baseURL: "https://interactive-comments-backend.onrender.com",
      method: method,
      ...(token && {
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      ...(data && { data: data }),
    });
  };

  return { fetch };
};
