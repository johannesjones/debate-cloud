export function reducer(state = {}, action) {
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
            comment: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_FRIENDS:", state);
    }

    return state;
}
