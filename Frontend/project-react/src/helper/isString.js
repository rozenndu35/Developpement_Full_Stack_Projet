  /*
    Verifie si c'est un string et non pas caractere correspondant un du code potentiel
  */
export default function isString( value){
    return value.match(/^.*[<>/\\].*$/);
}