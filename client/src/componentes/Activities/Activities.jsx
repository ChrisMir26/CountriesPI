import React from "react";
import style from "./Activities.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getActivities,deleteActivity } from "../../redux/action";


const Activities = () =>{

    const dispatch = useDispatch()
    const activities = useSelector(state => state.activities)
    const [isActivityDeleted, setIsActivityDeleted] = useState(false)

    useEffect(()=>{
        dispatch(getActivities())

    },[dispatch])

    useEffect(() => {
        if (isActivityDeleted) {
          window.location.reload(); // Recargar la página cuando isActivityDeleted sea true
        }
      }, [isActivityDeleted]);

    const activityDeleted = (id) => {
        dispatch(deleteActivity(id))
        setIsActivityDeleted(true)
      };
    

return (
    <div className={style.Activities}>
        <div className={style.actCnt}>
    <h1>Activities available</h1>
    <hr />


         <ul className={style.ulAct}>
                {
                    activities && activities.map((e)=>{
                      return <li className={style.list}  key={e.id}> {e.name} <button className={style.btnDeleted}  onClick={()=>{activityDeleted(e.id)}}>x</button></li>
                    })
                }

        </ul> 

        </div>

        


    </div>
)


}

export default Activities