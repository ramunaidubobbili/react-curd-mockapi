import axios from "axios";

export default axios.create({
  baseURL: "https://6094f85b94009e00176b61ef.mockapi.io/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});