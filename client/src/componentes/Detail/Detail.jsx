import React from "react";
import style from "./Detail.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { countryById, clearCountryDetails,deleteActivity } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countryDetail);
  const { id } = useParams();


  useEffect(() => {
    dispatch(countryById(id));

    return () => {
      dispatch(clearCountryDetails());
    };
  }, [dispatch]);

  


    
  return (
    <div className={style.detailCtn}>
      {country?.name ? (
        <>
          <div className={style.detailBox}>
            <div className={style.detailtop}>
              <div className={style.detailImgCnt}>
                <img
                  className={style.detailImg}
                  src={country.flags}
                  alt=""
                  srcSet=""
                />
              </div>
              <h1 className={style.countryH1}>{country?.name}</h1>
            </div>
            <div className={style.detailBottom}>
              <h3 className={style.dataH3}>Country Data</h3>
              <div className={style.detailBottomText}>
                <h3 className={style.countryH3}>
                  Code: <span>{country.id.toUpperCase()}</span>{" "}
                </h3>{" "}
                <hr />
                <h3 className={style.countryH3}>
                  Continent: <span>{country.continents}</span>
                </h3>{" "}
                <hr />
                <h3 className={style.countryH3}>
                  capital:<span>{country.capital}</span>{" "}
                </h3>{" "}
                <hr />
                {country.subregion && (
                  <h3 className={style.countryH3}>
                    Subregion: <span>{country.subregion}</span>
                  </h3>
                )}
                <hr />
                {country.area && (
                  <h3 className={style.countryH3}>
                    Area: <span>{country.area}</span>
                  </h3>
                )}
                <hr />
                <h3 className={style.countryH3}>
                  {" "}
                  population:{" "}
                  {<span>{country.population.toLocaleString()}</span>}
                </h3>{" "}
                <hr className={style.populationClass} />
              </div>
            </div>
          </div>

          {country.Activities && country.Activities.length > 0 && (
            <div className={style.activitiCtn}>
              <h1>Activities available</h1>
              {country.Activities.map((activity) => (
                <div className={style.activitiCard} key={activity.id}>
                  <h3>{activity.name} </h3>
                  <hr />
                  <p>
                    Duration{" "}
                    <span className={style.spanDetail}>
                      {activity.duration} Hours
                    </span>
                  </p>
                  <p>
                    Difficulty{" "}
                    <span className={style.spanDetail}>{activity.difficulty}</span>
                  </p>
                  <p>
                    Season{" "}
                    <span className={style.spanDetail}>{activity.seasons}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className={style.ldsDualRing} ></div>
        </>
      )}
    </div>
  );
};

export default Detail;
