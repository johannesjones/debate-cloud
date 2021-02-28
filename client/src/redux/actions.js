import axios from "../Axios";

export async function receiveAllSubClaims() {
    console.log("Inside receiveAllSubClaims");
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get(`/get-subClaims`);
    //we always return an object that is our action
    console.log("DATA WITHIN receiveWannabeFriends", data);
    return {
        type: "RECEIVE_ALL_SUBCLAIMS",
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
