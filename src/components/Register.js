import React, { useState } from 'react'
import AuthServices from "../services/AuthServices";
import Navigation from './Navigation';
import CommonBg from './CommonBg';
import banner from "./img/bg-auth-new.jpg";

function Register(props){

    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null) 

    async function signUp(e){
        e.preventDefault();      
        var status = await AuthServices.signUp({'name':name, 'password':password})
        if (status){
            props.history.push("/login")
        }         
    }

    return (
        <>
            <Navigation />
            <CommonBg class="md:hidden" heading ="Register Here" big={false}/>
            <div className="container">
                <div className="md:grid md:grid-cols-3 justify-center">                   
                    <div className="pt-16 md:pt-0 flex items-center justify-center text-center bg-white">
                        <form onSubmit={ signUp }>
                            <div className="w-full mb-5">
                                <input type="email" className="p-3 w-full rounded-sm focus:outline-none focus:ring-yellow-500 ring-yellow-800 ring-2" placeholder="Enter Email" name="name" onChange={(e)=> setName(e.target.value)} required/>
                            </div>
                            <div className="w-full mb-5">
                                <input type="password" className="p-3 w-full rounded-sm focus:outline-none focus:ring-yellow-500 ring-yellow-800 ring-2" placeholder="Enter Password" name="password" onChange={(e)=> setPassword(e.target.value)} required/>
                            </div>                             
                            <button type="submit"  className="p-3 bg-yellow-800 border-yellow-700 rounded-sm text-white font-bold">Sign Up</button>
                        </form>
                    </div>
                    <div className="md:block hidden md:col-span-2">
                        <img src={banner} alt={banner}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
