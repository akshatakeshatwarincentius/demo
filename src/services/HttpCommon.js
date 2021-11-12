import axios from "axios";

export default axios.create({
  baseURL: "http://akshatak.pythonanywhere.com/",//"http://192.168.99.26:5000/", //
  headers: {
    "Content-type": "application/json"
  }
});