import React, { useState } from 'react'
import AuthServices from "../services/AuthServices";
import Navigation from './Navigation';
import CommonBg from './CommonBg';

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
            <CommonBg heading ="Register Here" big={false}/>
            <div className="container mx-auto px-24 bg-gray-100 pt-16 pb-16">
                <div className="grid grid-cols-4 justify-center">
                    <div></div>
                    <div className="p-10 bg-white rounded-lg shadow-xl col-span-2">
                        <form onSubmit={ signUp }>
                            <div className="w-full mb-5">
                                <input type="email" className="p-3 w-full rounded-xl focus:outline-none focus:ring-yellow-500 ring-yellow-200 ring-2" placeholder="Enter Email" name="name" onChange={(e)=> setName(e.target.value)} required/>
                            </div>
                            <div className="w-full mb-5">
                                <input type="password" className="p-3 w-full rounded-xl focus:outline-none focus:ring-yellow-500 ring-yellow-200 ring-2" placeholder="Enter Password" name="password" onChange={(e)=> setPassword(e.target.value)} required/>
                            </div>                             
                            <button type="submit"  className="p-3 bg-yellow-600 border-yellow-700 rounded-lg text-white font-bold">Submit</button>
                        </form> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
