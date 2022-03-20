import Body from "../Body/Body";
import Header from "../Header/Header";
import Message from "../Message/Message";
export default function Base(){
    return(
        <div className="App">
            <Header/>
            <Body/>
            <Message/>
        </div>
    );
}