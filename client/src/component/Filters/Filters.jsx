import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderByAsc, setOrderByDesc, orderDriversByDOBAsc, orderDriversByDOBDesc, filterByDataBase, filterByApi, filteredByTeam, getTeams } from "../../Redux/action";
import "./Filter.css"
const Filter = () => {
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState('')
  const teams = useSelector((state) => state.teams); // Obtén la lista de equipos desde el estado Redux

  useEffect(() => {
    dispatch(getTeams()); // Realiza la llamada a la API para obtener los equipos cuando se monta el componente
  }, []);


  const handleOrderChange = (event) => {
    setSelectedTeam(event.target.value);
    if (event.target.value === 'asc') {
      dispatch(setOrderByAsc());
    } else if (event.target.value === 'desc') {
      dispatch(setOrderByDesc());
    }
  };

  const handleOrderDob = (event) => {
    setSelectedTeam(event.target.value);
    
    // Aplicar la orden según la opción seleccionada
    if (event.target.value === 'dob-asc') {
      dispatch(orderDriversByDOBAsc());
    } else if (event.target.value === 'dob-desc') {
      dispatch(orderDriversByDOBDesc());
    }
  };

  const filter = (event) => {
    setSelectedTeam(event.target.value);
    
    // Aplicar la orden según la opción seleccionada
    if (event.target.value === 'BaseDatos') {
      dispatch(filterByDataBase());
    } else if (event.target.value === 'Api') {
      dispatch(filterByApi())
    }
  };

 
    
    const handleTeamChange = (event) => {
      const selectedTeamName = event.target.value;
    
      // Actualiza el equipo seleccionado en el estado local
      setSelectedTeam(selectedTeamName);
    
      // Aplica el filtro automáticamente al cambiar la selección
      if (selectedTeamName) {
        dispatch(filteredByTeam(selectedTeamName)); // Llama a la acción y pasa el equipo seleccionado
      }
    };
    

  return (
    <div className='filtros'>
      <select  value={selectedTeam} onChange={handleOrderChange}>
        <option value="">Sort by name</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      
      <select id="orderDOB" value={selectedTeam} onChange={handleOrderDob}>
        <option value="">Sort by dob</option>
        <option value="dob-asc">Ascending</option>
        <option value="dob-desc">Descending</option>
      </select>
       
       <select value={selectedTeam} onChange={filter}>
        <option value="">Origin</option>
        <option value="BaseDatos">Data Base</option>
        <option value="Api">Api</option>
      </select>
        
      <select onChange={handleTeamChange} value={selectedTeam}>
  <option value="">Select by team</option>
  {teams.map((team) => (
    <option key={team.id} value={team.name}>
      {team.name}
    </option>
  ))}
</select>

    </div>
  );
};

export default Filter;









