import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { socket } from "./socket";
import { loginStatus } from "./redux/actions";
import axios from "./Axios";

export default function CommentModal({ id }) {
    console.log("Inside CommentModal, Id subClaim: ", id);
    const ref = useRef();
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");

    const comments = useSelector(
        (state) => state.allSubClaims.find((claim) => claim._id === id).comments
    );
    const commentUpdate = useSelector((state) => state.comment);

    console.log("LOG COMMENTS", comments);
    console.log("LOG commentUpdate", commentUpdate);

    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [comments, commentUpdate]);

    const sendComment = async (e) => {
        try {
            const { data } = await axios.get("/session-status");
            console.log("RESULT: ", data.userloggedIn);
            if (data.userloggedIn) {
                console.log("COMMEND SENT, this is e", e);
                console.log("LOG COMMENT inside sendComment", comment);
                e.preventDefault();
                socket.emit("sendComment", {
                    commentText: comment,
                    claimId: id,
                });
                setComment("");
            } else {
                dispatch(loginStatus(true));
            }
        } catch (error) {
            console.log("ERROR IN sendComment", error);
        }
    };

    return (
        <>
            <h2 id="commentHeadline">Comments:</h2>
            <div className="comment">
                <div className="comments" ref={ref}>
                    {commentUpdate && (
                        <p>
                            <strong>{commentUpdate[0].commentText}</strong>
                        </p>
                    )}
                    {comments &&
                        comments.map((comment, index) => (
                            <div className="comment" key={index}>
                                {/* <img
                                    src={comment.profile_pic_url || "/default.png"}
                                /> */}
                                <p>
                                    <br></br>
                                    <br></br>
                                    {new Intl.DateTimeFormat("en-GB", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    }).format(new Date(comment.createdAt))}{" "}
                                    &apos;
                                    <strong>
                                        {comment.commentText}&apos;{" "}
                                    </strong>
                                    by {comment.first} {comment.last}
                                </p>
                            </div>
                        ))}

                    <div className="commentInput">
                        <textarea
                            cols="30"
                            rows="5"
                            placeholder="type here"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button onClick={(e) => sendComment(e)}>Send</button>
                    </div>
                </div>
            </div>
        </>
    );
}
