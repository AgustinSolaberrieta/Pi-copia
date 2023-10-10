import {Link} from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () =>{
    return(
        <div className='Pag_inicio'>
            <h1>Landig para entrar a la pagina </h1>
            <button class="shadow__btn">
                <Link to="/home">Entro</Link>
            </button>
        </div>
    )
}
export default LandingPage;