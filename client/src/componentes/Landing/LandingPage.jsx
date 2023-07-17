import React from "react";
import style from "../Landing/Landing.module.css"
import { useNavigate } from "react-router-dom";


const LandingPage = ( ) =>{

    const navigate= useNavigate();
    const handleClick = () => {
        navigate("/home");
      };
    return(
        <div className={style.landingCtn}>
            <h1 className={style.landingHero}>Welcome to my country Page</h1>
                
                    <button className={style.landingBtn}type="" onClick={handleClick }>Lets start</button>
                    
        </div>
    )
}


export default LandingPage