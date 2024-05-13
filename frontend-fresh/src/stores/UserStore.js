import { extendObservable } from "mobx";

class UserStrore {
    constructer( ){
        extendObservable( this,{
            loading: true, 
            isLoggedIn: false, 
            username: ""
        }
    )}
}


export default new UserStrore