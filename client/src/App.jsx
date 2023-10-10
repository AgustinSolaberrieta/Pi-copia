
// export default App
import LandingPage from './component/LandingPage/LandingPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import Cards from './component/Cards/Cards';
 import Detail from './component/Detail/Detail'
 import Nav from './component/Nav/Nav';
import Form from './component/Form/Form';

function App() {
    
     const location = useLocation()

  return (
    <> 
      <div>
        {location.pathname === "/home" && <Nav />}
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path='/home' element={<Cards/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>  
        <Route path='/create' element={<Form/>}/>
    
      </Routes>
      
    </>
  );
}

export default App