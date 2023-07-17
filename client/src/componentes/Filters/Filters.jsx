import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinent,
  sortPopulation,
  sortAlphabet,
  getActivities,
  filterActivities,
  setCurrentPage,
} from "../../redux/action";
import style from "./filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    // Se ejecuta una vez al montar el componente para obtener las actividades
    dispatch(getActivities());
  }, [dispatch]);


  let filter =
    Array.isArray(activities) &&
    activities.map((activity) => {
      return activity.name;
    });

  function onSelectFilterChange(e) {
    e.preventDefault();
    // Verifica qué tipo de filtro se ha seleccionado y realiza la acción correspondiente
    if (e.target.name === "continent" && e.target.value !== "All") {
      dispatch(filterByContinent(e.target.value))
      dispatch(setCurrentPage(1))

    } else if (e.target.value === "All") {
      // Si se selecciona "All", se eliminan los filtros y se obtienen todos los países nuevamente
      dispatch(filterByContinent(""));
      dispatch(getCountries());
      dispatch(setCurrentPage(1))

    } else if (e.target.name === "alphabet" && e.target.value !== "Alphabet") {
      dispatch(sortAlphabet(e.target.value));
    } else if (e.target.value === "Alphabet") {
      // Si se selecciona "Alphabet", se eliminan los filtros y se obtienen todos los países nuevamente
      dispatch(sortAlphabet(""));
      dispatch(getCountries());
      dispatch(setCurrentPage(1))

    } else if (
      e.target.name === "activities" &&
      e.target.value !== "Activities"
    ) {
      // Seleccionar una actividad específica como filtro
      // Se envía la acción para filtrar por actividad

      dispatch(getActivities());
      dispatch(filterActivities(e.target.value));
      dispatch(setCurrentPage(1))

    } else if (e.target.value === "Activities") {
      // Si se selecciona "Activities", se eliminan los filtros y se obtienen todos los países nuevamente
      dispatch(filterActivities(""));
      dispatch(getCountries());
      dispatch(setCurrentPage(1))

    }
  }

  function onSelectSortChange(e) {
    e.preventDefault();
    // Verifica qué tipo de ordenamiento se ha seleccionado y realiza la acción correspondiente
    if (e.target.name === "population" && e.target.value !== "Population") {
      dispatch(sortPopulation(e.target.value));
          dispatch(setCurrentPage(1))

    } else {
      dispatch(sortPopulation(""));
      dispatch(getCountries());
      dispatch(setCurrentPage(1))

    }
  }

  return (
    <div className={style.filterContainer}>
      <div className={style.containerForms}>
        <div className={style.containerOrderSelect}>
          <label>Sort</label>
          <select
            name="alphabet"
            className={style.select}
            onChange={(e) => {
              onSelectFilterChange(e);
            }}
          >
            <option>Alphabet</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select
            name="population"
            className={style.select}
            onChange={(e) => {
              onSelectSortChange(e);
            }}
          >
            <option>Population</option>
            <option value="ascendant">Ascendant</option>
            <option value="descendant">Descendant</option>
          </select>
        </div>
        <div className={style.containerFilterSelect}>
          <label>Filter </label>
          <select
            name="continent"
            className={style.select}
            onChange={(e) => {
              onSelectFilterChange(e);
            }}
          >
            <option>All</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select
            name="activities"
            className={style.select}
            onChange={(e) => {
              onSelectFilterChange(e);
            }}
          >
            {/* Si hay actividades disponibles, se muestra la opción "Activities" */}
            {filter && filter.length > 0 ? (
              <option value="Activities">Activities</option>
            ) : (
              <option>No activities</option>
            )}
            {/* Si hay actividades disponibles, se muestran las opciones de filtrado por actividad */}
            {filter.length > 0 &&
              filter.map((nameActivity) => {
                return (
                  <option key={nameActivity} value={nameActivity}>
                    {nameActivity}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
