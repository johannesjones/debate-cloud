import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import DebateFrame from "./DebateFrame";
import MakeClaimComp from "./MakeClaimComp";
import Logo from "./Logo";
import Registration from "./Registration";
import Login from "./Login";

export default function App() {
    const loggedIn = useSelector((state) => state.loginStatus);
    /*
    useEffect(() => {
        effect;
        //dispatch getUserInfo
        //in actions: axios request to server to check if the user is logged in
        //if server
        //uploader

        return () => {
            cleanup;
        };
    }, [input]); */

    return (
        <BrowserRouter>
            <div className="appDiv">
                <div className="headerDiv">
                    <Logo />
                    <h1>DebateCloud</h1>
                </div>
                <div className="mainBodyDiv">
                    <Route exact path="/" render={() => <MakeClaimComp />} />
                    <Route
                        /* path="/debate/:claimId" */
                        path="/debate"
                        render={() => <DebateFrame />}
                    />
                </div>
                <div className="authDiv">
                    {!loggedIn && <Registration />}
                    {loggedIn && <Login />}
                </div>
            </div>
        </BrowserRouter>
    );
}
