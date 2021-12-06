import React, { useState } from 'react'
import AuthServices from '../services/AuthServices';
import { useHistory, Link } from "react-router-dom";

export default function Navigation() {
  const history = useHistory();
  const [logged_in,] = useState(AuthServices.isLogin());
  function logout() {
    AuthServices.logOut()
    history.push("/login")
  }
  const [MobileNav, setMobileNav] = useState(false)

  return (
    <>
      <div className="container items-center">
        <div className="items-center justify-between w-full overflow-y-auto tflex whitespace-nowrap scroll-hidden ">
          <div className="flex flex-row flex-wrap mx-auto md:items-center md:flex-row justify-between justify-items-end">
            <div className="flex flex-inline items-center p-2">
              <Link to="/" className="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
                <h2 className="block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8 lg:italic">
                  Food Recipes
                </h2>
              </Link>
            </div>
            <nav className="flex flex-wrap items-center justify-start text-base">
              <ul className="items-center list-none md:hidden pr-5">
                <li onClick={() => setMobileNav(!MobileNav)}>
                  <svg class="w-6 h-6 text-gray-500" x-show="!showMenu" fill="none" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="2" viewBox="0 00 24 24" stroke="currentColor">
                    <path d="m4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </li>
              </ul>
              <ul className="items-center list-none lg:inline-flex md:inline-block hidden">
                {
                  !logged_in ?
                    (
                      <>
                        <li>
                          <Link to="/login" className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black">Login</Link>
                        </li>
                        <li>
                          <Link to="/register" className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black ">Register</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/my_recipes" className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black ">My Recipes</Link>
                        </li>
                        <li>
                          <span onClick={logout} className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black ">Logout <i className="pl-2 fa fa fa-sign-out"></i></span>
                        </li>
                      </>
                    )
                }
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className={MobileNav ? "" : "hidden"}>
        <ul className="pb-3 list-none">
          {
            !logged_in ?
              (
                <>
                  <li>
                    <Link to="/login" className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black ">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/my_recipes" className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black ">My Recipes</Link>
                  </li>
                  <li>
                    <span onClick={logout} className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black ">Logout <i className="pl-2 fa fa fa-sign-out"></i></span>
                  </li>
                </>
              )
          }
        </ul>
      </div>
    </>
  )
}
