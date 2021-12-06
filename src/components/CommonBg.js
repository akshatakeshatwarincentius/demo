import React from 'react'
import bg_img from './img/bg-auth.jpg'
import bg from "./img/bg.jpg"

export default function CommonBg(props) {
    return (
        <>
            <div className={props.class?props.class+" relative":"relative"}>
                <div className="bg-gray-800 opacity-90">
                    <img
                        src={props.big ? bg:bg_img}
                        className="w-full"
                        style ={{opacity:0.9, width:'100%'}}
                        alt="background"
                    />
                </div>
                <div className={props.big ? "absolute md:top-28 top-5 w-full text-center":"absolute md:top-20 top-5  w-full text-center"} >
                    <span className="p-2 md:p-4 md:text-2xl rounded-md bg-opacity-75 bg-yellow-800 font-black text-white italic drop-shadow-xl">{props.heading}</span>
                </div>
            </div>  
        </>
    )
    
}
