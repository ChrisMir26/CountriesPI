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
      };

    case FILTER_ACTIVITIES:
      const activityName = action.payload; // La actividad que estás buscando
      // Encontrar la actividad en el array de actividades
      const activity = state.activities.find(
        (activity) => activity.name === activityName
      );

      if (!activity) return { ...state, filteredCountries: state.countries };

      return { ...state, filteredCountries: activity.Countries };

    case CLEAR_COUNTRY_DETAILS:
      return initialState; // Restablece el estado a su valor inicial o a un estado vacío según tus necesidades

    case SORT_ALPHABET:
      const orderCountries =
        action.payload === "A-Z"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        filteredCountries: orderCountries,
      };
    case SORT_POPULATION:
      const orderPopulation =
        action.payload === "descendant"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        filteredCountries: orderPopulation,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
