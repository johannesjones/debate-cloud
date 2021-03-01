import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "../redux/actions";
import axios from "../Axios";

export default function useHandleSubmit(url, values) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    //error was also 'false' in setState constructor function

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
                        const { data } = await axios.post(url, values);
                        console.log("DATA inside handleSubmit:", data);
                        //alternative version: data.success ? location.replace("/") : setError(true)
                        if (!data.error) {
                            console.log("SERVER SIDE WORKS!!!");
                            location.replace("/debabte/:id");
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
