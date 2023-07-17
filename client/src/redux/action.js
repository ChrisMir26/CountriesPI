import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES";
export const SORT_POPULATION = "SORT_POPULATION";
export const SORT_ALPHABET = "SORT_ALPHABET";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const CLEAR_COUNTRY_DETAILS = 'CLEAR_COUNTRY_DETAILS';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const CURRENT_PAGE= 'CURRENT_PAGE';


export function getCountries() {
  return async (dispatch) => {
    const json = await axios("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getCountryByName(name) {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
        if(json.data)
         dispatch({ type: GET_COUNTRY_BY_NAME, payload: json.data });
       
    } catch (error) {
      throw new Error("Country not found")
     
  };}
}

export function countryById(id) {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/countries/detail/${id}`)
      dispatch({
        type: GET_COUNTRY_ID,
        payload: json.data
        })
    } catch (error) {
      console.log(error)
    }
  }}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function sortPopulation(payload) {
  return {
    type: SORT_POPULATION,
    payload
  };
}

export function sortAlphabet(payload) {
  return {
    type: SORT_ALPHABET,
    payload
  };
}

export function createActivity(activity) {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/activities",
        activity
      );

      dispatch({
        type: CREATE_ACTIVITY,
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const activities = await axios.get("http://localhost:3001/activities");
      dispatch({ type: GET_ACTIVITIES, payload: activities.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterActivities(payload) {

  return {
    type: FILTER_ACTIVITIES,
    payload
  };
}

export function clearCountryDetails() {
  return {
    type: 'CLEAR_COUNTRY_DETAILS'
  };
}

export const deleteActivity = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/activities/${id}`);
      dispatch({
        type: DELETE_ACTIVITY,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function setCurrentPage(payload) {

  return {
    type: CURRENT_PAGE,
    payload
  };
}