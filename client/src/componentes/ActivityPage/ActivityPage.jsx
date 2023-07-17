import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { getCountries, createActivity } from "../../redux/action";
import style from "./activityPage.module.css";

export default function ActivityPage() {
  const regex = /^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [error, setError] = useState({});
  const [mostrarError, setMostrarError] = useState(false);
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: 0,
    seasons: "",
    countries: [],
  });

const sortedCountries = (arr) =>{
  const countries = arr.sort((a, b) => a.name.localeCompare(b.name))
  return countries
}

const countriesFixed = sortedCountries(allCountries)


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

    if(e.target.name === "name"){
      
        if(!regex.test(e.target.value)){
          setError("The name must be between 3 and 10 characters long and cannot contain numbers or special characters.");
          setMostrarError(true)
        }
        else{
          setInput({...input,[e.target.name]: e.target.value,})
          setMostrarError(false)
        }
    }else if (e.target.name === "countries") {
      if (input.countries.length <= 2) {
        setInput({
          ...input,
          countries: input.countries.includes(e.target.value)
            ? input.countries
            : [...input.countries, e.target.value],
        });
      } 
          
    } else if (e.target.name === "duration"){
          if(e.target.value > 0 && e.target.value <= 12 ){
            setInput({...input,
              [e.target.name]: e.target.value})
          }else{
            setError("Enter a duration between 1 and 12 hours.");
          }
      } else {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    
    }
  };

/*   
  setInput(((prev) => ({
    ...prev,        //CHEQUEARRRR ESTE DESPUES SI LE PUEDO PONER ...INPUT EN VEZ DE PREV
    [e.target.name]: e.target.value,
  }));)

}
};
 */
  

  function handleSubmit(e) {
    e.preventDefault();
    if (!regex.test(input.name)) {
      setError("The name must be between 3 and 10 characters long and cannot contain numbers or special characters.");
      setMostrarError(true);
      return;
    } else if (input.difficulty < 1 || input.difficulty > 5) {
      setError("Enter a difficulty between 1 and 5.");
      setMostrarError(true);
      return;
    } else if (input.duration < 1 || input.duration > 12) {
      setError("Enter a duration between 1 and 12 hours.");
      setMostrarError(true);
      return;
    } 
    else if (input.seasons.trim() === "") {
      setError("Please select a season of the year.");
      setMostrarError(true);
      return;
    } else if (input.countries.length === 0 ) {
      setError("Please select between one and three countries.");
      setMostrarError(true);
      return;
    } else if (activities.length >= 11 ) {
      setError("Sorry youve reached to max activities");
      setMostrarError(true);
      return; 
    } else {
      dispatch(
        createActivity({
          ...input,
           duration: Number(input.duration)
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
/*    function handleDelete(countryName) {


    setInput((prevInput) => ({
      ...prevInput,
      countries: prevInput.countries.filter((c) => c !== countryName),
    }));
    console.log(input)

  }  */
  
  function handleDelete(countryName) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== countryName)})
 
    }


  const comeBackHome = () => {
    navigate("/home");
  };

  const PaintError = () => (
    <p className={style.error}>{error}</p>
  );

  return (
    <div className={style.formDiv}>
      <div className={style.formCnt}>
        <h1>CREATE ACTIVITY</h1>
        <form id="formulario" onSubmit={(e) => handleSubmit(e)}>
          <div className={style.divForm}>
            <h5 className={style.divh5}>
              Name of the activity.
            </h5>
      
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

          </div>

          <div>
            <h5  className={style.divh5}>
              Difficulty of the activity.
            </h5>

            <label className={style.formLabel}>
              <strong>Difficulty:</strong>{" "}
            </label>
            <select
              className={style.formInput}
              defaultValue="Open this select menu"
              onChange={(e) => handleInputChange(e)}
              name="difficulty"
            >
              <option disabled>Open this select menu</option>
              <option value={1}>1 - Very Easy</option>
              <option value={2}>2 - Easy</option>
              <option value={3}>3 - Normal</option>
              <option value={4}>4 - Hard</option>
              <option value={5}>5 - Very Hard</option>
            </select>
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
            >
              <option disabled>Open this select menu</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
            </select>
          </div>
          <div>
            <h5 className={style.divh5}>
              Select up to four countries where you will carry out the
              activity.
            </h5>
            <label className={style.formLabel}>
              <strong>Countries:</strong>{" "}
            </label>
            <select
              className={style.formInput}
              defaultValue="Open this select menu"
              name="countries"
              onChange={(e) => handleInputChange(e)}
            >
              <option disabled>Open this select menu</option>
              {countriesFixed?.map((c) => (
                <option value={c.name} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {mostrarError && <PaintError />}


            <div className="btnDetail">
              <button className={style.btnForm} type="submit">
                Create ✓
              </button>
              
                <button
                  type="button"
                  className={style.btnForm}
                  onClick={comeBackHome}
                >
                  ◁ Volver
                </button>
             

              <ul>
                {input.countries.length > 0 &&
                  input.countries?.map((country) => (
                    <li className={style.formLi} key={country}>
                      <div key={country}>
                        {country + " "}
                        <button
                          type="button"
                          className={style.modalBtn}
                          onClick={()=>handleDelete(country)}
                        >
                          X
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
}




