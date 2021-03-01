import { comments, commentUpdate } from "./redux/actions";
import { io } from "socket.io-client";

export let socket;

export const initSocket = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("comments", (msgs) => store.dispatch(comments(msgs)));

        socket.on("commentUpdate", (msg) => store.dispatch(commentUpdate(msg)));
    }
};
