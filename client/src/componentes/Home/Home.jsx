import React, { useState } from "react";
import  Cards from "../Cards/Cards"
 import { useEffect } from "react";
import {  useDispatch} from "react-redux"; 
import {getCountries} from "../../redux/action"
import style from "./Home.module.css"
import Header from "../Header/Header";






export default function Home() {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className={style.homeContainer}>

        <Header/>
         
 
        <Cards  />

        
      

    </div>
  );
} 
