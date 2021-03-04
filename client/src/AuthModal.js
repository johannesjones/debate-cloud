import Registration from "./Registration";
import Login from "./Login";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "./redux/actions";

export default function AuthModal() {
    const [showRegModal, setshowRegModal] = useState(true);
    const dispatch = useDispatch();

    return (
        <>
            <div className="RegLoginDiv">
                <Logo />
                {showRegModal && (
                    <div>
                        <div className="closeRegLogin">
                            <button
                                id="login"
                                onClick={() => setshowRegModal(false)}
                            >
                                Login here
                            </button>
                            <button
                                onClick={() => dispatch(loginStatus(false))}
                            >
                                Close
                            </button>
                        </div>

                        <Registration />
                    </div>
                )}

                {!showRegModal && (
                    <div>
                        <div className="closeRegLogin">
                            <button
                                id="login"
                                onClick={() => setshowRegModal(true)}
                            >
                                ← Back to Register
                            </button>
                            <button
                                onClick={() => dispatch(loginStatus(false))}
                            >
                                Close
                            </button>
                        </div>

                        <Login />
                    </div>
                )}
            </div>
        </>
    );
}
