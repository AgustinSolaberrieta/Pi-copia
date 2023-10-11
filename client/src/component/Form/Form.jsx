import "./Form.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../Redux/action";
import validation from "../validation"
const endpoint = 'http://localhost:3001'

const Form = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
 

  const apiteams = useSelector(state => state.teams)
  
  useEffect(()=>{
    dispatch(getTeams())
  }, [])

  const handleBack = () => {
    window.history.back();
}


  const [driver, setDriver] = useState({ //creando un estado inicial driver , para almacenar información sobre un conductor.
    name: "",
    surname: "",
    nationality: "",
    dob: "",
    image: "",
    description: "",
    teams: [], // Esto debe ser un equipo seleccionado en el dropdown
  });
  const [error, setError] = useState({})
  const [teamsToShow, setTeamsToShow] = useState(20); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${endpoint}/drivers`, driver);
      navigate(`/detail/${response.data.id}`);
      return
    } catch (error) {
      console.error("Error al crear conductor:", error);
    }console.log(validationErrors)
  };

  const handleTeamChange = (event) => {
    const teamsName = event.target.value;
    const isCheked = event.target.checked;

    let updateDriver;

    if (isCheked) {
      updateDriver = [...driver.teams, teamsName]; 
    } else {
      updateDriver = driver.teams.filter((team) => team !== teamsName); 
    }

    setDriver({ ...driver, teams: updateDriver }); 
    
    setError(validation(driver))
  }

  
 
  return (
  <div className="fon">
     <button onClick={handleBack} className="logOut" style={{ marginLeft: 'auto' }}>BACK</button>
     
 
    <div className="formulario">
      
      <h1 className="titulo">Create your own driver</h1>

      <section className="forminput">

      <div className="Columna">
        <div className="labelinput">
            <label htmlFor="name">Name</label>
            <input  type="text" id="name" name="name" value={driver.name} onChange={(e) => setDriver({ ...driver, name: e.target.value })}/>
            {error.name && <p >{error.name}</p>}
         </div>
        <div className="labelinput">
          <label htmlFor="nationality">Nationality</label>
          <input  type="text" id="nationality" name="nationality" value={driver.nationality} onChange={(e) => setDriver({ ...driver, nationality: e.target.value })}/> 
          {error.nationality && <p >{error.nationality}</p>}
        </div>

        <div className="labelinput">
            <label htmlFor="image">Image</label>
           <input  type="text" id="image" name="image" value={driver.image} onChange={(e) => setDriver({ ...driver, image: e.target.value })}/>
           {error.image && <p >{error.image}</p>}
        </div>
     </div>
         
      
      <div className="Columna">
      <div className="labelinput">
          <label htmlFor="surname">Surname</label>
          <input  type="text" id="surname" name="surname" value={driver.surname} onChange={(e) => setDriver({ ...driver, surname: e.target.value })}/>
          {error.surname && <p >{error.surname}</p>}
      </div>
      <div className="labelinput">
           <label htmlFor="dob">Dob</label>
           <input  type="date" id="dob" name="dob" value={driver.dob} onChange={(e) => setDriver({ ...driver, dob: e.target.value })}/>
           {error.dob && <p >{error.dob}</p>}
      </div>   
      <div className="labelinput"> 
           <label htmlFor="description">Description</label>
           <input  type="text" id="description" name="description" value={driver.description} onChange={(e) => setDriver({ ...driver, description: e.target.value })}/>
           {error.description && <p >{error.description}</p>}
      </div>

      </div> 

    </section>
    
      <div className="equipos">
      <label htmlFor="teams">Teams</label>

      <ul className="team-list">
        {apiteams.map((team) => {
          return (
            <li key={team.id} className="itemlist">
              <input
                type="checkbox"
                name={team.name}
                value={team.name}
                checked={driver.teams.includes(team.name)}
                onChange={handleTeamChange}
              />
              <span name={team.name}>{team.name}</span>
            </li>
          );
        })}
      </ul>
      </div>

      <button onClick={handleSubmit}  class="btn">Create</button>
    </div></div>
  );
};

export default Form;

