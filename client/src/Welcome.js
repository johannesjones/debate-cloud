import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "./Logo";

//function component, pre-hook times,"dumb" or "presentational" are alternative names
export default function Welcome() {
    return (
        <div className="welcomeDiv">
            <HashRouter>
                <div>
                    <Logo />
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
