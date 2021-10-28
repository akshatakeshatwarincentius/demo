import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import RecipesServices from '../services/RecipesServices';
import Navigation from './Navigation';
import CommonBg from './CommonBg';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

export function DataList(props) {

    const [allItems, setAllItems] = useState([])
    const [listItems, setListItems] = useState([])
    const [sort_direction, setSortDirection] = useState(true)
    const [deleteRecipe, setDeleteRecipe] = useState(false)

    useEffect(() => {
        RecipesServices.getAll(JSON.parse(localStorage.getItem("login")).user_id)
        .then(response => {
            setListItems(response.data.Recipes)
            setAllItems(response.data.Recipes)
        })
        .catch(error =>{
            console.log(error)
        });

        changeOrder();
        return () => {
            //cleanup
        }
    }, [deleteRecipe])

    function applyFilter(val){
        let search_field = val.toLowerCase();
        let filtered_data = allItems.filter(function(item){
            return item.name.toLowerCase().includes(search_field)   
        });
        return filtered_data;
    }

    function filterAll(e){
        let val = e.target.value;
        setListItems(applyFilter(val))
    }

    function changeOrder(){
        setSortDirection(!sort_direction)
        setListItems(sort_direction ? listItems.sort((a, b) => a.id - b.id) :listItems.sort((a, b) => a.id - b.id).reverse())      
    }

    const DeleteRow = (e) => {
        if(window.confirm(" Do you want to delete ?")){
            RecipesServices.remove(e)
            .then(response => {
                toast.success('Deleted Successfully')
                setDeleteRecipe(!deleteRecipe)                
            })
        }  
    }

    return (
        <>
            <Navigation />

            <CommonBg heading ="My Recipes" />
            <div className="container mx-auto px-24 bg-gray-100 pt-16 pb-16">
                <div className="p-10 bg-white rounded-lg shadow-xl">     
                    <div className="grid grid-cols-3 justify-center">
                        <div className="col-span-2">
                            <Link to="/add_edit">
                                <button className="p-2 bg-yellow-600 border-yellow-700 rounded-lg text-white font-bold"> 
                                    Add
                                </button>
                            </Link> &nbsp; &nbsp;
                            <button className="p-2 bg-yellow-600 border-yellow-700 rounded-lg text-white font-bold" onClick={(e) => changeOrder(e.target.value)}> 
                                Arrange Id By {sort_direction ? 'Ascending' : 'Descending'} Order 
                            </button>
                        </div>
                        <div className="">
                            <input className="p-2 w-full rounded-xl focus:outline-none focus:ring-yellow-500 ring-yellow-200 ring-2" onChange={(e) =>filterAll(e.target.value)} placeholder="Filter By Name"/>
                        </div>
                        <div className="col-span-3 pt-10">
                            <table className="w-full table-auto border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 p-2">#</th>
                                        <th className="border border-gray-400 p-2">Name</th>
                                        <th className="border border-gray-400 p-2">Description</th>
                                        <th className="border border-gray-400 p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listItems.length ?
                                        listItems.map((data, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-gray-400 p-2">{i+1}</td>
                                                    <td className="border border-gray-400 p-2">{data.name}</td>
                                                    <td className="border border-gray-400 p-2">{data.description}</td>
                                                    <td className="border border-gray-400 p-2">
                                                        <Link to={"/add_edit?id="+data.id}>
                                                            <b className="text-primary"><i className="fa fa fa-edit"></i></b> 
                                                        </Link>
                                                        &nbsp; &nbsp;
                                                        <b className="text-danger" onClick={(id) => DeleteRow(data.id)} ><i className="fa fa fa-trash"></i></b>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr><td colSpan="5" className="border border-gray-400 p-2">No Data Found</td></tr>  
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}

export default DataList
