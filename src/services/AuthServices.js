import HttpCommon from "./HttpCommon";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

const getUsers = (header) => {
  return HttpCommon.get("/users", {headers:header});
};

const signIn = async (data) => {
  let response = await HttpCommon.post("/login", data)
  if(response.data.ok) {
    localStorage.setItem("login", JSON.stringify(response.data.data));
    toast.success('Logged in Successful')
    return true
  }else{
    toast.error('Check Login Credentials Again')
    return false
  }
};

const isLogin = () => {
  let store = JSON.parse(localStorage.getItem("login"))
  if(store && store.logged_in){
    return (true)
  }else{
    return (false)
  }
}

const logOut = () => {
  localStorage.removeItem("login")
};

const signUp = async (data) => {
  let response = await HttpCommon.post("/register", data)
  //console.log(response.data.ok)
  if(response.data.ok) {
    toast.success(response.data.data["message"])
    return true
  }else{
    toast.error("Not Registered Successfully")
    return false
  }
};

const AuthServices = {
  getUsers,
  signIn,
  signUp,
  logOut,
  isLogin
}
export default AuthServices