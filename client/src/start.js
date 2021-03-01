import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./redux/reducer";
import { initSocket } from "./socket.js";

import App from "./App";
import Welcome from "./Welcome";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem =
        (initSocket(store),
        (
            <Provider store={store}>
                <App />
            </Provider>
        ));
}

ReactDOM.render(elem, document.querySelector("main"));
