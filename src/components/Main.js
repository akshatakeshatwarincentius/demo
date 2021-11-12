import {useEffect, useState} from 'react';
import Navigation from './Navigation';
import FoodRecipe from "../services/FoodRecipe";
import { Redirect, Route } from 'react-router';
import banner from "./img/banner.jpg";
import { Link } from "react-router-dom";

function Main() {

    const [categoryList, setCategoryList] = useState([])
    const [search, setSearch] = useState(false)
    const [searched_term, setSearchedTerm] = useState('')

    useEffect(() => {
        FoodRecipe.getAllCat()
        .then(response => {
            setCategoryList([...response.data.categories])
            setSearch(false)
        })
        .catch(error =>{
            console.log(error)
        });
        return () => {
            //cleanup
        }
    }, [])

    if (search){
        return (
            <Route>
                <Redirect to={{
                    pathname: '/filter',
                    state: { searched_term: searched_term }
                }}
                ></Redirect>
            </Route>
        )
    } else {
        return (
            <>
            <Navigation />
            <div className="relative">
                    <img
                        src={banner}
                        alt="banner"
                    />
                    <div className="absolute w-full top-8 md:top-32 text-center">
                       <div className="w-full">
                        <h1 className="text-yellow-50 md:pb-10 italic md:text-3xl font-black sm:text-sm sm:pb-5">Search Recipes...</h1>
                        <form>
                            <div>
                                <input className="md:p-3 rounded-l-full border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:border-transparent md:w-auto w-32"
                                onChange={(e)=>setSearchedTerm(e.target.value)} />                       
                                <button className="md:p-3 ring-2 bg-yellow-800 ring-yellow-900 text-white rounded-r-full" onClick= {() => setSearch(true)}>Go</button>
                            </div>   
                        </form>                                                
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-24 bg-gray-100 pt-16 pb-16">
               <div className="text-center w-full italic text-4xl pb-8">Categories</div>
                <div className="grid md:grid-cols-5 sm:grid-cols-1"> 
                    {
                        categoryList.length ?
                        categoryList.map((data, i) => {
                            return (
                            <div className="m-2 p-4 rounded-lg shadow-xl  bg-white" key={i}>
                                <Link to ={{
                                                pathname:'/filter',
                                                state:{
                                                    category:data.strCategory
                                                }
                                        }}>
                                    <img className="rounded-lg" src={data.strCategoryThumb} alt={data.strCategory} />
                                    <div>
                                    
                                        <div className="w-full text-center pt-5 font-semibold text-gray-700">{data.strCategory}</div>
                                   
                                    </div>
                                </Link>
                            </div>
                            )
                        })
                        : <div></div>
                    }
                    </div>
                </div>
            </>
        )
    }
}

export default Main;
