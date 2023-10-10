
import { Link } from "react-router-dom";
import Filter from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar"; 
import "./Nav.css"
const Nav = () => {



   
  return (
    <nav>
      
      
      <SearchBar />
      <Filter/>
      
      <button className='Boton2'  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to='/create'>New Driver</Link>
        </button>
        
     
        
    </nav>
  );
};

export default Nav;
