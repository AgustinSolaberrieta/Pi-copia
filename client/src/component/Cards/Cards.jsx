import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from "../../Redux/action";
import Card from "../Card/Card";
import "./Cards.css"


const Cards = () => {

  const dispatch = useDispatch();
  const driver = useSelector((state) => state.drivers.data || []); // Obtiene los datos de los conductores desde Redux
  const driversPerPage = 9; // Número de conductores por página
  const [currentPage, setCurrentPage] = useState(1); // Página actual, comienza en la página 1
  

  useEffect(() => {
    // Al cargar el componente, dispara la acción para obtener los conductores
    dispatch(getDrivers());
  }, [dispatch]);


  
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = driver.slice(indexOfFirstDriver, indexOfLastDriver);
 
  useEffect(()=>{
 setCurrentPage(1)

  }, [driver]) // cuando los conductores cambian se vuelve aponer en el primero


  return (
    <div className="cartas-container">
      
    <div >
    <div className="cartas-wrapper">
        {/* Mapea y muestra los conductores actuales como componentes "Card" */}
        {currentDrivers.map((driver) => (
          <div className='cartas'>
          <Card
            key={driver.id}
            id={driver.id}
            name={driver.name}
            surname={driver.surname}
            image={driver.image}
            Teams={driver.Teams}
          /></div>
        ))}
      </div>

      {/* Botones de paginación */}
      <div className="pagination">
        {/* Botón "Anterior" que disminuye la página actual */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1} // Deshabilitado en la primera página
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
           </svg>BACK 

        </button>

        {/* Botón "Siguiente" que aumenta la página actual */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="page-link"
          disabled={currentPage === Math.ceil(driver.length / driversPerPage)} // Deshabilitado en la última página
        >
          NEXT <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
</svg>

        </button>
      </div>
    </div>
    </div>
  
  );
};

export default Cards;
