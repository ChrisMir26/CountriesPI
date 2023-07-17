import React from "react";
import style from "./Nav.module.css"
import {Link, NavLink} from "react-router-dom"
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/action";


const Nav = () =>{
    const dispatch = useDispatch()

    
    
    
    const handleSubmit = () =>{
            dispatch(getCountries())
    }

    return (

      

        <nav>
            <NavLink to="/home" onClick={handleSubmit} className={style.countryLink}>Countries</NavLink>
            <Link to="/allActivities" className={style.activityLink}>Activities Available</Link>
            <Link to="/activities" className={style.activityLink}>Add activity</Link>

        </nav>
    )
}




export default Nav