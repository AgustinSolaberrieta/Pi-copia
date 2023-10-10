import {Link} from 'react-router-dom'
import './LandingPage.css'
import logoo from "./logo.png"

const LandingPage = () =>{
    return(
        <div className='Pag_inicio'>
            <button class="shadow__btn">
                <Link to="/home"><img src={logoo} style={{ width: '300px', height: 'auto' }} /></Link>
            </button>
        </div>
    )
}
export default LandingPage;