
import { useState , useEffect} from "react";
import { Link } from 'react-router-dom';

import Navigation from './Navigation'
import FoodRecipe from "../services/FoodRecipe";
import YouTube from "./img/watch-on-youtube-min.png";
import CommonBg from './CommonBg';

export default function SingleRecipe(props)  {

    const [Recipe, setRecipe] = useState('')
    const [Title, setTitle] = useState('')

    useEffect(() => {
        if(props.location.state.id !== undefined) {
            FoodRecipe.getRecipeById(props.location.state.id)
            .then(response => {
                setRecipe(response.data.meals[0])
                setTitle(response.data.meals[0].strMeal)
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
                <div className="container mx-auto px-2 md:px-24 pt-10 pb-10 md:pt-16 md:pb-16 bg-gray-100">
                        <div className="grid md:grid-cols-4 gap-4 m-3 p-4 rounded-lg shadow-xl bg-white">
                            <div>
                                <img src={Recipe.strMealThumb} alt={Recipe.strCategory}/>
                                <p className="m-4">
                                    <b> <i class="fa fa-list-alt" aria-hidden="true"></i> </b>
                                    <Link to={{
                                        pathname:'/filter',
                                        state:{
                                            category: Recipe.strCategory
                                        }
                                    }}
                                    className="text-yellow-800"
                                    >{Recipe.strCategory}</Link>
                                    <br /> 
                                    <b> <i class="fa fa-flag" aria-hidden="true"></i> </b> 
                                    <Link to={{
                                        pathname:'/filter',
                                        state:{
                                            area: Recipe.strArea
                                        }
                                    }}
                                    className="text-yellow-800"
                                    >{Recipe.strArea}</Link>
                                    <br/>
                                    
                                    <b> <i class="fa fa-tag" aria-hidden="true"></i> </b> 
                                    {Recipe.strTags}

                                </p>
                            </div>
                            <div className="col-span-3">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <div className="font-bold w-full text-center">Instruction </div>
                                            <p className="text-justify">
                                                {Recipe.strInstructions}
                                            </p>
                                            <a href={Recipe.strYoutube} target="_blank" rel="noreferrer">
                                                <img width="100" src={YouTube} alt="YouTube icon" />
                                            </a>
                                        </div>
                                        <div className="">
                                            <table  className="table-auto border border-gray-400">
                                                <thead>
                                                    <tr>
                                                    <th className="border border-gray-400 p-1">Ingredient</th>
                                                    <th className="border border-gray-400 p-1">Measure</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Object.keys(Recipe).filter(key => key.startsWith('strIngredient') && Recipe[key] !== null && Recipe[key] !== "").map((key, i) =>{
                                                            return(
                                                                <tr>
                                                                    <td className="border border-gray-400 p-2">{Recipe[key]}</td>
                                                                    <td className="border border-gray-400 p-2">{Recipe['strMeasure'+key.replace('strIngredient','')]}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>  
                            </div>
                        </div>
                </div>
            </>
        )
}
