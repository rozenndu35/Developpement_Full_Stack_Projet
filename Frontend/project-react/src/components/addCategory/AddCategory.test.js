import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCategory from './AddCategory';

let newCategoryMock = { categoryName: ""};
let inputInvalidMock = false;

/*
    Modifie la nouvelle Category
*/
function handleChangeMock(event) {
    const {value} = event.target;
    if(value.match(/^.*[<>/\\].*$/)){
        inputInvalidMock = "Vous ne pouvez pas inserer de caractere speciaux";
    }else if((newCategoryMock.categoryName+value).length > 255){
        inputInvalidMock = "Le nombre maximum est de 255 caractere";
    }else{
        inputInvalidMock = false;
        newCategoryMock.categoryName += value;
    }
}   

let submitCategoryResutl = false ;
function submitCategoryMock() {
    if (newCategoryMock.categoryName !== ""){
        submitCategoryResutl(true);
    }else{
        inputInvalidMock = "Vous devez remplir les champs";
    }
  }
function initialiser(){
    submitCategoryResutl = false;
    newCategoryMock = { categoryName: ""};
    inputInvalidMock = false;
}
it ("should Verifier Affichage",() => {
    initialiser();
    render(<AddCategory newCategory={newCategoryMock} inputInvalid={inputInvalidMock} handleChange={handleChangeMock} submitCategory={submitCategoryMock}/>);
    expect(screen.getByText("Ajouter une categorie")).toBeTruthy();
    expect(screen.getByText("Nom de la category :")).toBeTruthy();
    expect(screen.getByPlaceholderText("Donne un nom...")).toBeTruthy();
    expect(screen.getByText("Envoyer")).toBeTruthy();

});

it ("should Entre text invalide nom caractere",() => {
    initialiser()
    render(<AddCategory newCategory={newCategoryMock} inputInvalid={inputInvalidMock} handleChange={handleChangeMock} submitCategory={submitCategoryMock}/>);
    userEvent.type(screen.getByPlaceholderText("Donne un nom..."), "<p> test </p>");
    expect(inputInvalidMock).toEqual("Vous ne pouvez pas inserer de caractere speciaux")
    newCategoryMock = { categoryName: ""};
    inputInvalidMock = false;
});

it ("should Entre text invalide nom nombre caractere",() => {
    render(<AddCategory newCategory={newCategoryMock} inputInvalid={inputInvalidMock} handleChange={handleChangeMock} submitCategory={submitCategoryMock}/>);
    userEvent.type(screen.getByPlaceholderText("Donne un nom..."), "azertyuiopmlkjhyuyuiopmlkjhyuiopmlkjhyuiopmlkjhiopmlkjhgyuiopmlkjhfyuiopmlkjhdsqwxcvbnazertyuiopmlkjhgfdsqwxcvbnazertyuiopmlkjhgfdsqwxcvbnazertyuiopmlkjhgfdsqxwcvbnazertyuiopmlkjhgfdsqwxcvbnazertyuiopmlkjhgfdsqwxcvbnnbvcxwqsdfghjklmpoiuytrezaazertqsdfghjky");
    expect(inputInvalidMock).toEqual("Le nombre maximum est de 255 caractere")
});
it ("should Entre text valide limit nom nombre caractere",() => {
    initialiser()
    render(<AddCategory newCategory={newCategoryMock} inputInvalid={inputInvalidMock} handleChange={handleChangeMock} submitCategory={submitCategoryMock}/>);
    userEvent.type(screen.getByPlaceholderText("Donne un nom..."), "azertuiopmlkjhyuyuiopmlkjhyuiopmlkjhyuiopmlkjhiopmlkjhgyuiopmlkjhfyuiopmlkjhdsqwxcvbnazertyuiopmlkjhgfdsqwxcvbnazertyuiopmlkjhgfdsqwxcvbnazertyuiopmlkjhgfdsqxwcvbnazertyuiopmlkjhgfdsqwxcvbnazertyuiopmlkjhgfdsqwxcvbnnbvcxwqsdfghjklmpoiuytrezaazertqsdfghjky");
    expect(inputInvalidMock).toEqual(false)
});


it ("should Entre nom normal",() => {
    initialiser()
    render(<AddCategory newCategory={newCategoryMock} inputInvalid={inputInvalidMock} handleChange={handleChangeMock} submitCategory={submitCategoryMock}/>);
    userEvent.type(screen.getByPlaceholderText("Donne un nom..."), "CategorieTest");
    expect(newCategoryMock.categoryName).toEqual("CategorieTest")
    expect(inputInvalidMock).toEqual(false)
});

it ("should Envoyer mais vide",() => {
    initialiser()
    render(<AddCategory newCategory={newCategoryMock} inputInvalid={inputInvalidMock} handleChange={handleChangeMock} submitCategory={submitCategoryMock}/>);
    userEvent.click(screen.getByText("Envoyer"));
    expect(inputInvalidMock).toEqual("Vous devez remplir les champs");
    expect(submitCategoryResutl).toEqual(false);
});
