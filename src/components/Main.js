import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import FoodRecipe from "../services/FoodRecipe";
import { Redirect, Route } from 'react-router';
import banner from "./img/banner.png";
import { Link } from "react-router-dom";
import Carousel from './Carousel';

function Main() {

    const [categoryList, setCategoryList] = useState([])
    const [search, setSearch] = useState(false)
    const [searched_term, setSearchedTerm] = useState('')
    const [Country, setCountry] = useState([])

    useEffect(() => {
        FoodRecipe.getAllCat()
            .then(response => {
                setCategoryList([...response.data.categories])
                setSearch(false)
            })
            .catch(error => {
                console.log(error)
            });

        FoodRecipe.getCountry()
            .then(response => {
                setCountry([...response.data.meals])
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    if (search) {
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
                    <img src="https://t3.ftcdn.net/jpg/02/57/29/88/360_F_257298837_B8n4pIKuxTVd2O9FyZAr44b4jU5FGnCH.jpg" alt="banner" style={{ width: "100%" }} />
                    <div className="absolute w-full top-8 md:top-32 md:pl-32">
                        <div className="w-72 md:w-96 text-center">
                            <h1 className="text-yellow-50 md:pb-3 italic md:text-3xl font-black sm:text-sm sm:pb-3">
                                Food Recipes
                            </h1>
                            <h2 className="text-yellow-50 md:pb-5 sm:pb-5 italic">
                                INSPIRED RECIPES FOR YOUR KITCHEN
                            </h2>
                            <form>
                                <input className="p-1 md:p-3 rounded-l-full border outline-none ring-2 ring-yellow-900 border-transparent md:w-auto w-32"
                                    onChange={(e) => setSearchedTerm(e.target.value)}
                                    placeholder="Search here" />
                                <button className="p-1 md:p-3  bg-yellow-800 border outline-none ring-2 ring-yellow-900 text-white rounded-r-full" onClick={() => setSearch(true)}>Go</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 hidden">
                    <Carousel show={20} >
                        {
                            Country.length ?
                                Country.map((data, i) => {
                                    return (
                                        <div keys={i} className="p-5">
                                            <Link to={{
                                                pathname: '/filter',
                                                state: {
                                                    area: data.strArea
                                                }
                                            }}
                                                class="px-4 py-1 mr-1 text-base text-gray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600">
                                                {data.strArea}
                                            </Link>
                                        </div>
                                    )
                                })
                                : ""
                        }
                    </Carousel>
                </div>

                <div className="container mx-auto px-5 md:px-24 pt-10 pb-10 md:pt-16 md:pb-16 bg-gray-100 ">
                    <div className="text-center w-full italic text-2xl md:text-4xl pb-8 main-heading">
                        Categories
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-2">
                        {
                            categoryList.length ?
                                categoryList.map((data, i) => {
                                    return (
                                        <div className="m-2 p-4 rounded-lg shadow-xl bg-white" key={i}>
                                            <Link to={{
                                                pathname: '/filter',
                                                state: {
                                                    category: data.strCategory
                                                }
                                            }}>
                                                <img className="rounded-lg transform hover:-translate-y-1 duration-500 hover:scale-110" src={data.strCategoryThumb} alt={data.strCategory} />
                                                <div>
                                                    <div className="w-full text-center p-2 font-semibold text-gray-700">
                                                        {data.strCategory} &nbsp;
                                                        <i class="opacity-0 hover:opacity-100 fa fa-arrow-right" aria-hidden="true"></i>
                                                    </div>
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
