import Registration from "./Registration";
import Login from "./Login";
import { useState } from "react";

export default function AuthModal() {
    const [showRegModal, setshowRegModal] = useState(true);

    return (
        <div className="RegLoginDiv">
            {showRegModal && (
                <div>
                    <Registration />
                    <button onClick={() => setshowRegModal(false)}>
                        Login here
                    </button>
                </div>
            )}

            {!showRegModal && (
                <div>
                    <Login />
                    <button onClick={() => setshowRegModal(true)}>
                        Register here
                    </button>
                </div>
            )}
        </div>
    );
}
