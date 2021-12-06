import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navigation from './Navigation'
import FoodRecipe from "../services/FoodRecipe";
import CommonBg from './CommonBg';

function FilterRecipe(props) {
    
    const [MealList, setMealList] = useState([])
    const [Title, setTitle] = useState("Indian Food Recipe List")

    useEffect(() => {
        if(props.location.state.area !== undefined) {
            FoodRecipe.getFilteredByCountry(props.location.state.area)
            .then(response => {
                setMealList([...response.data.meals])
                setTitle(props.location.state.area+" Food Recipe List")
            })
            .catch(error =>{
                console.log(error)
            });
        }else if(props.location.state.category !== undefined) {
            FoodRecipe.getFilteredByCategory(props.location.state.category)
            .then(response => {
                setMealList([...response.data.meals])
                setTitle("Category - " +props.location.state.category)
            })
            .catch(error =>{
                console.log(error)
            });
        }else if(props.location.state.searched_term !== "") {
            FoodRecipe.getSearchedByName(props.location.state.searched_term)
            .then(response => {
                setMealList([...response.data.meals])
                setTitle("Meal names that has searched term '"+props.location.state.searched_term+"'")
            })
            .catch(error =>{
                console.log(error)
            });
        }else{
            FoodRecipe.getIndainRecipes()
            .then(response => {
                setMealList([...response.data.meals])
            })
            .catch(error =>{
                console.log(error)
            });
        }
        return () => {
            //cleanup
        }
    }, [props])
    
    return (
        <>
        <Navigation />
        <CommonBg heading={Title} big={true}/>
        <div className="container mx-auto px-5 md:px-24 pt-10 pb-10 md:pt-16 md:pb-16 bg-gray-100 ">
            <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-2"> 
                    {
                        MealList.length ?
                        MealList.map((data, i) => {
                            return (
                            <div className="m-3 p-4 rounded-lg shadow-xl bg-white" key={i}>
                                <Link to = {{
                                                pathname:'/recipe',
                                                state:{
                                                    id:data.idMeal
                                                }
                                                }} 
                                    >
                                        <img className="rounded-lg transform hover:-translate-y-1 duration-500 hover:scale-110" src={data.strMealThumb} alt={data.strMeal} />
                                        <div className="w-full text-center text-gray-700 pt-5 font-semibold">&nbsp; {data.strMeal} </div>
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

export default FilterRecipe