export function activate(body = {}) {
    return new Promise((resolve, reject) => {
        const entityInfo = body.entityInfo; //The information about the entity requesting the activation
        const solutionInfo = body.solutionInfo //The information about the solution requesting the activation
        const userInfo = body.userInfo; //The information about the user that is requesting the activation
        const apiInfo = body.apiInfo; //The information about the api the request is asking for a connection to
        const subscriptionId = body.subscriptionId; //The id that identifies this pairing of entity and solution
        const connectionId = body.connectionId; //The id that identifies this connection to an api within the subscription
        console.log(entityInfo,solutionInfo,userInfo,apiInfo,subscriptionId,connectionId);
        //persist this information in my db
        resolve();
    })
}
export function deactivate(connectionId) {
    return new Promise((resolve, reject)=>{
        //update my table to disconnect this connect in my db
        resolve();
    })
}