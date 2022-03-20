import Navigation from '../Navigation/Navigation';
import './body.css'
import './formulaire.css'
import { Outlet } from 'react-router-dom';

export default function Body() {
    return (
        <div className='App-body'>
            <Navigation/>
            <div className='App-content'>
                <Outlet/>
            </div>
        </div>
    )
}