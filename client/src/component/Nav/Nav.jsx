
import { Link } from "react-router-dom";
import Filter from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar"; 
import "./Nav.css"
const Nav = () => {



   
  return (
    <nav>
      
      
      <SearchBar />
      <button className='Boton2'  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" , color: "gren"}}>
          <Link to='/create'style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>New Driver</Link>
        </button>
      <Filter/>
        
    </nav>
  );
};

export default Nav;
