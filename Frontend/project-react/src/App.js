import './App.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

function App() {
  const allCategory = [{
    id: 0,
    name: "Vetement"
  }, {
    id: 1,
    name: "Numerique"
  },{
    id: 2,
    name: "Meuble"
  },{
    id: 10,
    name: "Meuble"
  }]
  const allArticle =[]

  return (
    <div className="App">
      <Header />
      <Body allCategory={allCategory} allArticle={allArticle}/>
      <Footer />
    </div>
  );
}

export default App;
