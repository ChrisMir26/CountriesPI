import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountries, createActivity } from "../../redux/action";
import style from "./activityPage.module.css";

export default function ActivityPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [error, setError] = useState({
    name: "",
    difficulty: "",
    duration: "",
    seasons: "",
    countries: "",
    activities: ""
  });
  const [mostrarError, setMostrarError] = useState(false);
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: 0,
    seasons: "",
    countries: [],
  });

  const sortedCountries = (arr) => {
    const countries = arr.sort((a, b) => a.name.localeCompare(b.name));
    return countries;
  };

  const countriesFixed = sortedCountries(allCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarError(false);
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [mostrarError]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ]{0,15}$/;
    const name = e.target.name
    const value = e.target.value

    switch (name) {
      case "name":
        if (!regex.test(value)) {
          setError({ name: "The name cannot contain numbers or special characters." });
          setMostrarError(true);
        } else {
          setInput(({ ...input, [name]: value }));
          setMostrarError(false);
        }
        break;
      case "countries":
        if (input.countries.length === 3)
        setError({ countries: "you cant add anymore countries" })
        setMostrarError(true);


        if(input.countries.length <= 2){
          if (input.countries.includes(value)) {
            setError({ countries: `Contry already added` })
            setMostrarError(true);
          }else{
            setInput({
              ...input,
              countries: [...input.countries, value]
            })
            setMostrarError(false);    
          }
        }else{
          console.log(`sorry something went wrong`)

        }



        break;
      case "duration":
        if (value >= 0 && value <= 12) {
          setInput({...input, [name]: value })
          setMostrarError(false)
        } else {
          setError({ duration: "Enter a duration between 1 and 12 hours." });
          setMostrarError(true)

        }
        break;
      default:
        setInput({...input,
          [name]: value,
        });
        break;
    }
  };


  function handleSubmit(e) {
    e.preventDefault();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ]{3,15}$/;
    if (!regex.test(input.name)) {
      setError({ name: "The name must be between 3 and 15 characters long" });
      setMostrarError(true);

    }
    else if (input.difficulty < 1 || input.difficulty > 5) {
      setError({ difficulty: "Enter a difficulty between 1 and 5." });
      setMostrarError(true);

    }
    else if (input.duration < 1 || input.duration > 12) {
      setError({ duration: "Enter a duration between 1 and 12 hours." });
      setMostrarError(true);

    }
    else if (input.seasons.trim() === "") {
      setError({ seasons: "Please select a season of the year." });
      setMostrarError(true);

    }
    else if (input.countries.length === 0) {
      setError({ countries: "Please select up to three countries" });
      setMostrarError(true);

    }
    else if (activities.length === 11) {
      setError({ activities: "Sorry youve reached max activities,delete one to keep going" });
      setMostrarError(true);

    }
    else {
      dispatch(
        createActivity({
          ...input,
          duration: Number(input.duration),
        })
      );

      alert("Actividad/es creada/s con exito!!");

      setInput({
        name: "",
        difficulty: 0,
        duration: 0,
        seasons: "",
        countries: [],
      });
      navigate("/home");
    }
  }


  function handleDelete(countryName) {

    if (input.countries.length > 1) {
      setInput({
        ...input,
        countries: input.countries.filter((c) => c !== countryName)
      })
      setMostrarError(false)


    } else {
      setError({ countries: "cannot delete it you must have at least one country" })
      setMostrarError(true)
    }

  }

  const comeBackHome = () => {
    navigate("/home");
  };

  const clearForm = (e) => {
    setInput({
      name: "",
      difficulty: "",
      duration: 0,
      seasons: e.target.value,
      countries: [],
    });
  }


  return (
    <div className={style.formDiv}>
      <div className={style.formCnt}>
        <h1>CREATE ACTIVITY</h1>
        <form id="formulario" onSubmit={(e) => handleSubmit(e)}>
          <div className={style.divForm}>
            <h5 className={style.divh5}>Name of the activity.</h5>
            <label className={style.formLabel}>
              <strong>Name:</strong>{" "}
            </label>
            <input
              className={style.formInput}
              type="text"
              value={input.name}
              name="name"
              placeholder="Activity"
              onChange={(e) => handleInputChange(e)}
            />
            {error && error.name && <span className={style.error}>{error.name}</span>}

          </div>

          <div>
            <h5 className={style.divh5}>Difficulty of the activity.</h5>

            <label className={style.formLabel}>
              <strong>Difficulty:</strong>{" "}
            </label>

            <select
              className={style.formInput}
              defaultValue="Open this select menu"
              onChange={(e) => handleInputChange(e)}
              name="difficulty"
              value={input.difficulty}

            >
              <option disabled>Open this select menu</option>
              <option value="" style={{ display: 'none' }}>Open this select menu</option> // añade esta línea

              <option value={1}>1 - Very Easy</option>
              <option value={2}>2 - Easy</option>
              <option value={3}>3 - Normal</option>
              <option value={4}>4 - Hard</option>
              <option value={5}>5 - Very Hard</option>
            </select>
            {error && error.difficulty && <span className={style.error}>{error.difficulty}</span>}

          </div>
          <div>
            <h5 className={style.divh5}>Duration in hrs of the activity.</h5>

            <label className={style.formLabel}>
              <strong>Duration:</strong>{" "}
            </label>

            <input
              className={style.formInput}
              type="number"
              value={input.duration}
              name="duration"
              placeholder="Range from 1 to 12"
              onChange={(e) => handleInputChange(e)}
            />
            {error && error.duration && <span className={style.error}>{error.duration}</span>}

          </div>
          <div>
            <h5 className={style.divh5}>Season of the activity.</h5>

            <label className={style.formLabel}>
              <strong>Season:</strong>{" "}
            </label>
            <select
              className={style.formInput}
              defaultValue="Open this select menu"
              name="seasons"
              onChange={(event) => handleInputChange(event)}
              value={input.seasons} // aquí estamos pasando el valor del estado a nuestro campo

            >
              <option disabled>Open this select menu</option>
              <option value="" style={{ display: 'none' }}>Open this select menu</option> // añade esta línea
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
            </select>
            {error && error.seasons && <span className={style.error}>{error.seasons}</span>}

          </div>
          <div>
            <h5 className={style.divh5}>
              Select up to three countries where you will carry out the activity.
            </h5>
            <label className={style.formLabel}>
              <strong>Countries:</strong>{" "}
            </label>
            <select
              className={style.formInput}
              defaultValue="Open this select menu"
              name="countries"
              input={input.countries}
              onChange={(e) => handleInputChange(e)}
            >
              <option disabled>Open this select menu</option>
              <option value="" style={{ display: 'none' }}>Open this select menu</option> 
              {countriesFixed?.map((c) => (
                <option value={c.name} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {error && error.countries && <span className={style.error}>{error.countries}</span>}
            {error && error.activities && <span className={style.error}>{error.activities}</span>}


            <div className={style.btnDetail}>
              <button className={style.btnForm} type="submit">
                Create ✓
              </button>

              <button className={style.btnForm} onClick={(e) => { clearForm(e) }}>
                Clear Form
              </button>
              <button
                type="button"
                className={style.btnForm}
                onClick={comeBackHome}
              >
                ◁ Volver
              </button>
              </div>

              <ul>
                {input.countries.length > 0 &&
                  input.countries?.map((country) => (
                    <li className={style.formLi} key={country}>
                      {country + " "}
                      <button
                        type="button"
                        className={style.modalBtn}
                        onClick={() => handleDelete(country)}
                      >
                        X
                      </button>
                    </li>
                  ))}
              </ul>
            
          </div>
        </form>
      </div>
    </div>
  );
}

