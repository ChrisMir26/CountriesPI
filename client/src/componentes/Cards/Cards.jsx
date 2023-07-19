import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/action.js";
import {useNavigate } from "react-router-dom";
import Paginate from "../Paginate/Paginate.jsx";
import Card from "../Card/Card";
import style from "../Cards/Cards.module.css";
import { useEffect } from "react";


const Cards = () => {
  const dispatch = useDispatch()

  // Get all countries from redux store
  const { filteredCountries } = useSelector((state) => state);
  const { currentPage } = useSelector((state) => state);

  // State for the current page, initial value is 1

  // State for the number of countries per page, initial value is 10
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  // Calculate the index of the last country on the current page
  const indexOfLastCountry = currentPage * countriesPerPage;

  // Calculate the index of the first country on the current page
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  // Get only the countries for the current page from all countries
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Function to change the current page
  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  };

  // Function to handle going back to the previous page
  const handleBack = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    } 
  
  };

  const handleNext = (limitedPageNumbers) => {
    if (currentPage >= 0 && currentPage < limitedPageNumbers.length) {
      dispatch(setCurrentPage(currentPage + 1))
    } 
  };
  
  return (
    <div className={style.container}>



      {currentCountries.length === 0 ? (
        <div className={style.ldsRing} />
      ) : (
        <>
          {currentCountries.map((el) => (
            <Card
              key={el.id}
              id={el.id}
              flags={el.flags}
              name={el.name}
              population={el.population}
              continents={el.continents}
            />
          ))}
          
          {filteredCountries.length > countriesPerPage && (
            <Paginate
              countriesPerPage={countriesPerPage}
              filteredCountries={filteredCountries.length}
              paginate={paginate}
              currentPage={currentPage}
              handleNext={handleNext}
              handleBack={handleBack}
            />
            
          )}





        </>
      )}
    </div>
  );
};

export default Cards;









