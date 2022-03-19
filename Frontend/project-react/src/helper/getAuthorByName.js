import ApiConfig from "../config/ApiConfig";

export default function getAuthorByName(lastName, firstName){
    return fetch(ApiConfig.adress + "private/author/?lastName=" + lastName + "&firstName=" + firstName)
}