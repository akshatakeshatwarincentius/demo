import React, { useState, useEffect } from 'react'
import CommonBg from './CommonBg';
import RecipesServices from '../services/RecipesServices';
import Navigation from './Navigation';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export function AddEdit(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [user_id, setUser_id] = useState('')
    const [id, ] = useState(new URLSearchParams(props.location.search).get("id"))

    useEffect(() => {
        (id) ? (
            RecipesServices.get(id)
            .then(response => {
                setDescription(response.data.Recipe[0].description)
                setName(response.data.Recipe[0].name)
            })
            .catch(error =>{
                console.log(error)
            })
        ):(
            console.log()
        )
        setUser_id(JSON.parse(localStorage.getItem("login")).user_id)
        return () => {
            //cleanup
        }
    }, [id])

    function addRecipe(e){
        e.preventDefault();
        RecipesServices.create({'name':name, 'description':description, 'user_id':user_id})
        .then(response => {
            setName('')
            setDescription('')
            toast.success('Added Successfully')
            props.history.push("/my_recipes")
        })
        .catch(error =>{
            console.log(error)
        });
    }

    function editRecipe(e){
        RecipesServices.update(id, {'name':name, 'description':description, 'user_id':user_id})
        .then(response => {
            console.log(response)
            toast.success('Updated Successfully')
            props.history.push("/my_recipes")
        })
        .catch(error =>{
            console.log(error)
        });
        e.preventDefault()
    }
    
    return (
        <>
            <Navigation />
            <CommonBg heading ={id ? "Edit Recipe" : "Add Recipe" } />
            <div className="container px-5 md:px-24 pt-10 pb-10 md:pt-16 md:pb-16 bg-gray-100">
                <div className="grid md:grid-cols-5 justify-center">
                    <div></div>
                    <div className="p-10 bg-white rounded-lg shadow-xl col-span-3">
                        <form onSubmit={id ? editRecipe : addRecipe }>
                            <div className="mb-3 w-full">
                                <input type="text" placeholder="Enter Name" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="p-2 w-full rounded-xl focus:outline-none focus:ring-yellow-500 ring-yellow-200 ring-2" />
                            </div>
                            <div className="mb-3 w-full">
                                <textarea rows={3} className="p-2 w-full rounded-xl focus:outline-none focus:ring-yellow-500 ring-yellow-200 ring-2" placeholder="Enter Description" defaultValue={description} name="description" onChange={(e)=>setDescription(e.target.value)} ></textarea>
                            </div>
                            <button className="p-2 bg-yellow-600 border-yellow-700 rounded-lg text-white font-bold" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
        )
}

export default AddEdit