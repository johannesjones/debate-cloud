export function reducer(state = {}, action) {
    if (action.type === "CHANGE_LOGIN_STATUS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            loginStatus: action.payload,
        };

        //console.log("NEW STATE IN CHANGE_LOGIN_STATUS:", state);
    }

    if (action.type === "CHANGE_PRO_MAKECLAIM_STATUS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            showProMakeClaim: action.payload,
        };

        console.log("NEW STATE IN CHANGE_PRO_MAKECLAIM_STATUS:", state);
    }

    if (action.type === "CHANGE_CON_MAKECLAIM_STATUS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            showConMakeClaim: action.payload,
        };

        console.log("NEW STATE IN CHANGE_CON_MAKECLAIM_STATUS:", state);
    }

    if (action.type === "RECEIVE_ALL_MAINCLAIMS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            allMainClaims: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_SUBCLAIMS:", state);
    }

    if (action.type === "RECEIVE_ALL_SUBCLAIMS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            allSubClaims: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_SUBCLAIMS:", state);
    }

    if (action.type === "RECEIVE_HEADER_CLAIM") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            headerClaim: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_SUBCLAIMS:", state);
    }

    if (action.type === "GET_COMMENTS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            comments: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_FRIENDS:", state);
    }

    if (action.type === "UPDATE_COMMENTS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method
        state = {
            ...state,
            subClaims: state.allSubClaims.map((subClaim) => {
                if (subClaim._id === action.payload._id) {
                    subClaim.comments = action.payload.comments;
                }
                return subClaim;
            }),
        };
        console.log("ACTION: ", action);
        console.log("NEW STATE IN UPDATE_COMMENTS:", state);
    }

    return state;
}
