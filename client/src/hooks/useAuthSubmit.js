import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "../redux/actions";
import axios from "../Axios";

export default function useAuthSubmit(url, values) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    //error was also 'false' in setState constructor function

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent button to trigger refresh
        console.log("useAuthSubmit inside hook about to run axios");

        if (!values) {
            setError(true);
        } else {
            try {
                const { data } = await axios.post(url, values);
                console.log("DATA inside useAuthSubmit:", data);
                //alternative version: data.success ? location.replace("/") : setError(true)
                if (!data.error) {
                    dispatch(loginStatus(true));
                } else {
                    setError({
                        error: data.error,
                    });
                }
            } catch (err) {
                console.log("err in Login: ", err);
                this.setState({
                    error:
                        "Either your email is already registered or your password is wrong",
                });
            }
        }
    };
    return [error, handleSubmit];
}
