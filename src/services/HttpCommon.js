import axios from "axios";

export default axios.create({
  baseURL: "https://371npd.deta.dev/",//"http://192.168.99.26:5000/", //
  headers: {
    "Content-type": "application/json"
  }
});