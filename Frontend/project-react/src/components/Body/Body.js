import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ListCategory from '../ListCategory/ListCategory';
import './body.css'

export default function Body(props) {
    const [pageTwo, setPage] = useState();
    const [pageUpdate, setPageUpdate] = useState({update: false, pageId: -1 });


    useEffect(() => {
        if (pageUpdate.update) {
            setPage(pageUpdate.pageId)
            setPageUpdate({update: false, pageId: -1 });
        }
    }, [pageUpdate]);

    function afficherPage(event, id, category) {
        event.stopPropagation();
        setPageUpdate({update: true, pageId: id });
    }    

    return (
        <div className='App-body'>
            <Navigation categories={props.allCategory} afficherPage={afficherPage}/>
            <section className='App-page'>
                { pageTwo === "ListeCategory" && <ListCategory categories={props.allCategory} />}
            </section>

        </div>
    )
}