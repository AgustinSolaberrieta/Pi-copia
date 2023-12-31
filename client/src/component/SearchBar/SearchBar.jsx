import  { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBar } from "../../Redux/action";
import "./SearchBar.css"
import logo from "./logoo-removebg-preview.png"

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  
  const handleBack = () => {
    window.location.href = "/";
}

  // Función para manejar cambios en el campo de entrada
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSearch = () => {
    dispatch(searchBar(name)); // Llama a la acción searchBar con el término de búsqueda
  };

  return (
    <div className="container">
      <div className="header">
       <img src={logo} alt="" className='logo' />
      </div>
      {/* Agrega el campo de entrada y conecta la función handleChange */}
      <div className="containerInput">
      <input
        type="search"
        placeholder="  Search drivers by name..."
        value={name}
        onChange={handleChange} // Conecta la función handleChange al campo de entrada
      /></div>

      <button type="submit" className="submit" onClick={()=>{onSearch()}}>
        <span>
    <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
  </span></button>
      <button onClick={handleBack} className="logOut" style={{ marginLeft: 'auto' }}>LOG OUT</button>
    </div>
  );
};

export default SearchBar;