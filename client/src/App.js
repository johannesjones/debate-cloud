import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import DebateFrame from "./DebateFrame";
import MakeClaimComp from "./MakeClaimComp";
import AllMainClaimsComp from "./AllMainClaimsComp";

import Logo from "./Logo";
import AuthModal from "./AuthModal";

export default function App() {
    const showAuthModal = useSelector((state) => state.loginStatus);

    return (
        <BrowserRouter>
            <div className="appDiv">
                <div className="headerDiv">
                    <Logo />
                    <a href="/logout">
                        <h1>DebateCloud</h1>
                    </a>
                </div>
                <div className="mainBodyDiv">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div>
                                <MakeClaimComp />
                                <AllMainClaimsComp />
                            </div>
                        )}
                    />
                    <Route
                        path="/debate/:id"
                        /* path="/debate" */
                        render={(props) => (
                            <DebateFrame
                                match={props.match}
                                key={props.match.url}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="authDiv">{showAuthModal && <AuthModal />}</div>
        </BrowserRouter>
    );
}
