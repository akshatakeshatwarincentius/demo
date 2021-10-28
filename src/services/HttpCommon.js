import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.99.26:5000/", //"https://371npd.deta.dev/",//
  headers: {
    "Content-type": "application/json"
  }
});