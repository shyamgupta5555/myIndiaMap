
import axios from "axios";

export const api =axios.create({
  baseURL :process.env.REACT_APP_BASE_URL,
  // baseURL: "https://snow-ritzy-boysenberry.glitch.me/api"

})


api.interceptors.request.use(config => {
  console.log('Request was sent');
  config.headers["Authorization" ]= `${localStorage.getItem("token")}`
  return config
}, (error) => {
  // handle the error
  return Promise.reject(error);
});
