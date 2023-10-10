import { Link } from 'react-router-dom';
import "./Card.css"

const Card = ({ id, name, image, surname, Teams }) => {
  return (
    <div className='cards'>
    <div className="card">
      <Link to={`/detail/${id}`}>
        <h2 className="card-title">{name} {surname}</h2>
       
      </Link>
      <div class="card-image-container"><img
        src={image}
        alt={name}
        className="card-image"
      /></div>
       <h3 className="card-teams">{Teams}</h3>
    </div></div>
  );
}

export default Card;
