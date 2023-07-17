import React from "react";
import SearchBar from "../SearchBar/SearchBar"
import style from "./Header.module.css"
import Filters from "../Filters/Filters";

const Header = () =>{

    return(
        <header>
            <Filters/>
            <SearchBar/>
        </header>
    )
}




export default Header