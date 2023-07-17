import React, { useState } from "react";
import style from "../Card/Card.module.css"
import Paginate from "../Paginate/Paginate"
import {Link} from "react-router-dom"


const Card = ({flags,name,population,continents, id}) =>{
    
 


    return(
    <div>
        

        <div className={style.containerCard} >
            <div className={style.card}>
                <div className={style.topCard}>
                    <div className={style.cardImg}>
                        <img src={flags} alt="" srcSet=""/>
                    </div>
                    <h3 className={style.h3Card}>{name}</h3> 
                </div>
                <div className={style.text}>
                 <h4 className={style.h4Card}> Population: <span className={style.spanCard}>{population.toLocaleString()}</span></h4> 
                <h4 className={style.h4Card}>Continent:  <span className={style.spanCard}>{continents}</span></h4> 
             <Link to={`/detail/${id}`}>   <button className={style.btnSeeMore}>See more </button></Link>
             </div>

            </div>
            

    </div>
        </div>
    
    )

}

export default Card



/* 
<div className={style.containerCard}>
<div className={style.card}>
<div className={style.topCard}>
    <div className={style.cardImg}>
        <img src={flags} alt="" srcSet=""/>
    </div>
        <h2>{name}</h2> 
        </div>
    <div className={style.text}>
        <h4>{population}</h4> 
        <h4>{continent}</h4> 
    </div>

</div>


</div> */