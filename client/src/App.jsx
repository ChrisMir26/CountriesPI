import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Nav from "./componentes/NavBar/Nav"
import Home from './componentes/Home/Home';
import Detail from './componentes/Detail/Detail';
import ActivityPage from './componentes/activityPage/ActivityPage';
import Activities from './componentes/Activities/Activities'
import LandingPage from './componentes/Landing/LandingPage'
import { useLocation } from 'react-router-dom';


function App() {


  return (
    <div className='App'>
       {useLocation().pathname !== "/" && <Nav />} 
                  
    <Routes>
              <Route  path='/' element ={<LandingPage/>}/>
            <Route  path='/home' element ={<Home/> }/>
              <Route path='/detail/:id' element={<Detail />}/> 
              <Route  path='/activities' element ={<ActivityPage/> }/>
              <Route  path='/allActivities' element ={<Activities/> }/>

     </Routes>

    </div>
  )
}

export default App