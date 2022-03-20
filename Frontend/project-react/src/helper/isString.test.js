import isString from "./isString";


it ("should Insertion de texte html",() => {
    expect(isString("<p> test </p>")).not.toEqual(null)
});

it ("should Insertion texte nomral",() => {
    let result = isString("Texte normal; nous essayons")
    expect(result).toEqual(null);
});