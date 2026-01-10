

// import axios from "axios";

// export const getCart = async (user) => {
//   const res = await axios.get(
//     `http://localhost:5000/api/get-cart/${user._id}`,
//     { withCredentials: true }
//   );
//   return res.data;
// };
import axios from "axios";
import { API_URL } from "../config";

axios.defaults.withCredentials = true;

export const getCart = async (user) => {
  const res = await axios.get(
    `${API_URL}/api/get-cart/${user._id}`
  );
  return res.data;
};
