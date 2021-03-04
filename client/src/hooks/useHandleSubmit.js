import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../Axios";
import { useHistory } from "react-router-dom";
import {
    receiveAllSubClaims,
    showMakeClaim,
    loginStatus,
} from "../redux/actions";

export default function useHandleSubmit(serverRoute, values, id, type) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    //error was also 'false' in setState constructor function
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent button to trigger refresh
        console.log("useHandleSubmit inside hook about to run axios");

        if (!values) {
            setError(true);
        } else {
            try {
                const { data } = await axios.get("/session-status");
                console.log("RESULT: ", data.userloggedIn);
                if (data.userloggedIn) {
                    try {
                        const { data } = await axios.post(serverRoute, {
                            values,
                            id,
                            type,
                        });
                        console.log("DATA inside handleSubmit:", data);
                        console.log("DATA id", data._id);
                        //alternative version: data.success ? location.replace("/") : setError(true)
                        if (!data.error && !data.type) {
                            console.log("WE GET REDIRECTED TO DISCUSSION!!!");
                            history.push(`/debate/${data._id}`);
                        } else if (!data.error && data.type) {
                            console.log("WE STAY ON THIS PAGE!!!");
                            dispatch(receiveAllSubClaims(id));
                            dispatch(showMakeClaim(false));
                            history.push(`/debate/${data.parentClaimId}`);
                        } else {
                            setError({
                                error: data.error,
                            });
                            console.log("SOMETHING WRONG ON SERVER SIDE!!!");
                        }
                    } catch (err) {
                        console.log("err in Login: ", err);
                        this.setState({
                            error:
                                "Either your email is already registered or your password is wrong",
                        });
                    }
                } else {
                    dispatch(loginStatus(true));
                }
            } catch (error) {
                console.log("ERROR IN useHandleSubmit");
            }
        }
    };
    return [error, handleSubmit];
}
