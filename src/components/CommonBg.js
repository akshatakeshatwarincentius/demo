import React from 'react'
import bg_img from './img/bg-auth.jpg'
import bg from "./img/bg.jpg"

export default function CommonBg(props) {
    return (
        <>
            <div className="relative">
                <div className=" bg-yellow-600 opacity-90">
                    <img
                        src={props.big ? bg:bg_img}
                        className="w-full "
                        style ={{opacity:0.9, width:'100%'}}
                        alt="background"
                    />
                </div>
                <div className={props.big ? "absolute top-28 w-full text-center":"absolute top-20 w-full text-center"} >
                    <span className="p-4 text-2xl rounded-md bg-opacity-75 bg-yellow-600 font-black text-white italic drop-shadow-xl">{props.heading}</span>
                </div>
            </div>  
        </>
    )
    
}