import { BrowserRouter, Route } from "react-router-dom";
import DebateFrame from "./DebateFrame";
import MakeClaimComp from "./MakeClaimComp";
import Logo from "./Logo";

export default function App() {
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
            </div>
        </BrowserRouter>
    );
}
