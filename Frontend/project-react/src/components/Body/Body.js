import Navigation from '../Navigation/Navigation';
import './body.css'

export default function Body(props) {
    return (
        <div className='App-body'>
            <Navigation categories={props.allCategory}/>
            <section className='App-page'>
                Page ici
            </section>

        </div>
    )
}