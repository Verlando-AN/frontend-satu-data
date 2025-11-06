import axios from "axios";

const client = axios.create({
  baseURL: "https://api-satudata.lampungtimurkab.go.id",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default client;
