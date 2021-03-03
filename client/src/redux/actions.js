import axios from "../Axios";

export async function loginStatus(param) {
    console.log("Inside loginStatus");
    //we can OPTIONALLY "talk" to the server here...
    //const { data } = await axios.get(`/session-status`);
    //we always return an object that is our action
    //console.log("DATA WITHIN loginStatus", data);
    return {
        type: "CHANGE_LOGIN_STATUS",
        payload: param,
    };
}

export async function receiveAllMainClaims() {
    console.log("Inside receiveAllMainClaims");
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get(`/all-mainClaims`);
    //we always return an object that is our action
    console.log("DATA WITHIN receiveAllMainClaims", data);
    return {
        type: "RECEIVE_ALL_MAINCLAIMS",
        payload: data,
    };
}

export async function receiveAllSubClaims(id) {
    console.log("Inside receiveAllSubClaims");
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get(`/get-subClaims/${id}`);
    //we always return an object that is our action
    console.log("DATA WITHIN receiveAllSubClaims", data);
    return {
        type: "RECEIVE_ALL_SUBCLAIMS",
        payload: data,
    };
}

export async function receiveHeaderClaim(id) {
    console.log("Inside receiveHeaderClaim", id);
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get(`/claim/${id}`);
    //we always return an object that is our action
    console.log("DATA WITHIN receiveHeaderClaim", data);
    return {
        type: "RECEIVE_HEADER_CLAIM",
        payload: data,
    };
}

export async function comments(msgs) {
    console.log("Inside comments: ", msgs);
    //we can OPTIONALLY "talk" to the server here...
    //NOT NEEDED HERE!!!
    //we always return an object that is our action

    try {
        return {
            type: "GET_COMMENTS",
            payload: msgs,
        };
    } catch (err) {
        console.log("ERR in comments: ", err);
    }
}

export async function commentUpdate(msg) {
    console.log("INSIDE commentUpdate: ", msg);
    //we can OPTIONALLY "talk" to the server here...
    //NOT NEEDED HERE!!!
    //we always return an object that is our action

    try {
        return {
            type: "UPDATE_COMMENTS",
            payload: msg,
        };
    } catch (err) {
        console.log("ERR in commentUpdate: ", err);
    }
}
