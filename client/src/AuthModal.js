import Registration from "./Registration";
import Login from "./Login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "./redux/actions";

export default function AuthModal() {
    const [showRegModal, setshowRegModal] = useState(true);
    const dispatch = useDispatch();

    return (
        <>
            <div className="closeRegLogin">
                <button onClick={() => dispatch(loginStatus(false))}>Close</button>
            </div>
            <div className="RegLoginDiv">
                {showRegModal && (
                    <div>
                        <Registration />
                        <button id="login" onClick={() => setshowRegModal(false)}>
                            Login here
                        </button>
                    </div>
                )}

                {!showRegModal && (
                    <div>
                        <Login />
                        <button id="login" onClick={() => setshowRegModal(true)}>
                            ← Back to Register
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
