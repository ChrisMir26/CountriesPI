import React, { Fragment } from "react";
import style from "./SearchBar.module.css";
import {getCountryByName, setCurrentPage} from "../../redux/action";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



const SearchBar = () => {

  const dispatch = useDispatch()

  const [input, setInput] = useState("") 
  const [Error, setError] = useState(null);
  
  const handleChange = (e) => {
    const regex = /^[A-Za-z\s]{0,30}$/;
        const value = e.target.value
    if(!regex.test(value)){
      setError("Numbers and special characters are not allowed up to 30 characters")
      setTimeout(()=>{setError(null)},2000)
    }else{
      setInput(value)
    }
  }

 

  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch para buscar el país por nombre
    dispatch(getCountryByName(input))
      .then(() => {
        // Otro dispatch para cambiar la página actual a 1
        dispatch(setCurrentPage(1));
      })
      .catch((error) => {
        console.log(error.message)
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };
  







  return (
    <div>
        <div className={style.inputCtn}>
          <div className={style.h3Title}>
               <h3 className={style.h3Search}>Search by country name:</h3>
          </div>
        <form className={style.searchBar} onSubmit={handleSearch}>
        <input className={style.input} type="search" name="name" value={input} onChange={(e)=>{handleChange(e)}} />
        <button type="submit" className={style.inputBtn}  >Search</button>
        {Error && <div className={style.errorBar}>Error: {Error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

