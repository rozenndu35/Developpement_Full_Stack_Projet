function prepareMessageError(message){
    const messageInfo = "Erreur : " + message;
    const severityInfo = "error";
    return prepareMessage(messageInfo, severityInfo)
}

function prepareMessageSuccess(message){
    const messageInfo = message;
    const severityInfo = "success";
    return prepareMessage(messageInfo, severityInfo)
}

function prepareMessage(messageInfo, severityInfo){

    return {
        openInfo: true,
        messageInfo: messageInfo,
        severityInfo: severityInfo
    }
}

export {prepareMessageError, prepareMessage, prepareMessageSuccess};