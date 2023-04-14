
import axios from "axios";

export const api =axios.create({
  baseURL :"http://localhost:5000/api",

})


api.interceptors.request.use(config => {
  console.log('Request was sent');
  config.headers["Authorization" ]= `${localStorage.getItem("token")}`
  return config
}, (error) => {
  // handle the error
  return Promise.reject(error);
});
