import {
  GET_COUNTRIES,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRY_ID,
  GET_ACTIVITIES,
  SORT_ALPHABET,
  SORT_POPULATION,
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  FILTER_BY_CONTINENT,
  FILTER_ACTIVITIES,
  CLEAR_COUNTRY_DETAILS,
  CURRENT_PAGE,
} from "./action";

const initialState = {
  countries: [],
  countryDetail: [],
  filteredCountries: [],
  activities: [],
  currentPage: 1,
  continentFilter: "",
  lastFilter: "none",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter((a) => a.id !== action.payload),
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case GET_COUNTRY_ID:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case FILTER_BY_CONTINENT:
      const filterContinent =
        action.payload === "All"
          ? state.countries
          : state.countries.filter((el) => el.continents === action.payload);
      return {
        ...state,
        filteredCountries: filterContinent,
        lastFilter: "continent", // Aquí actualizamos lastFilter
      };

    case FILTER_ACTIVITIES:
      const activityName = action.payload; // La actividad que estás buscando
      // Encontrar la actividad en el array de actividades
      const activity = state.activities.find(
        (activity) => activity.name === activityName
      );

      // Si no encontramos la actividad, devolvemos un estado vacío (o lo que quieras devolver en este caso)
      if (!activity) return { ...state, filteredCountries: state.countries };

      // Si encontramos la actividad, devolvemos los países asociados a esa actividad
      return {
        ...state,
        filteredCountries: activity.Countries,
        lastFilter: "activity",
      };

    case CLEAR_COUNTRY_DETAILS:
      return initialState; // Restablece el estado a su valor inicial o a un estado vacío según tus necesidades

    case SORT_ALPHABET:
      let sortArray =
        state.lastFilter === "continent"
          ? state.countries
          : state.filteredCountries;
      let orderAlphabet;

      if (action.payload === "A-Z") {
        orderAlphabet = sortArray.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "Z-A") {
        orderAlphabet = sortArray.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      } else {
        orderAlphabet = sortArray;
      }

      return {
        ...state,
        filteredCountries: orderAlphabet,
      };

    case SORT_POPULATION:
      let sortArr =
        state.lastFilter === "continent"
          ? state.countries
          : state.filteredCountries;
      let orderPopulation;

      if (action.payload === "descendant") {
        orderPopulation = sortArr.sort(function (a, b) {
          if (a.population > b.population) {
            return 1;
          }
          if (b.population > a.population) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "ascendant") {
        orderPopulation = sortArr.sort(function (a, b) {
          if (a.population > b.population) {
            return -1;
          }
          if (b.population> a.population) {
            return 1;
          }
          return 0;
        });
      } else {
        orderPopulation = sortArr;
      }

      return {
        ...state,
        filteredCountries: sortArr,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
