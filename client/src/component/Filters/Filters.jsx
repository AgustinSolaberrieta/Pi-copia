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
    
    // Aplicar la orden según la opción seleccionada
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

  //  const handleOrderByNameAsc = () => {
  //   dispatch(setOrderByAsc());
  // };

  // const handleOrderByNameDesc = () => {
  //   dispatch(setOrderByDesc());
  // };


  // const handleOrderByDOBAsc = () => {
  //     dispatch(orderDriversByDOBAsc());
  //   };
  //   const handleOrderByDOBDesc = () => {
  //     dispatch(orderDriversByDOBDesc());
  //   };

    // const filterbybd= () => {
    //   dispatch(filterByDataBase())
    // }

    // const filterbyApi = () => {
    //   dispatch(filterByApi())
    // }
    
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
        <option value="">Selecciona una opción order por Nombre</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      {/* <button onClick={handleOrderByNameAsc}>Ordenar por Nombre Ascendente</button>
      <button onClick={handleOrderByNameDesc}>Ordenar por Nombre Descendente</button> */}

       {/* <label htmlFor="orderDOB">Ordenar por Fecha de Nacimiento:</label> */}
      <select id="orderDOB" value={selectedTeam} onChange={handleOrderDob}>
        <option value="">Ordenar por Fecha de Nacimiento</option>
        <option value="dob-asc">Ascendente</option>
        <option value="dob-desc">Descendente</option>
      </select>
      {/* <button onClick={handleOrderByDOBAsc}>Ordenar por Fecha de Nacimiento Ascendente</button>
      <button onClick={handleOrderByDOBDesc}>Ordenar por Fecha de Nacimiento Descendente</button>
       */}
       <select value={selectedTeam} onChange={filter}>
        <option value="">Ordenar por Fecha de Origen</option>
        <option value="BaseDatos">Creados</option>
        <option value="Api">Ya creados</option>
      </select>
       {/* <button onClick={filterbybd}>Ordena por creados </button>
       <button onClick={filterbyApi}>Ya creados</button> */}

     
      <select onChange={handleTeamChange} value={selectedTeam}>
  <option value="">Selecciona un equipo</option>
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









