import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { socket } from "./socket";

export default function Chat() {
    const ref = useRef();

    const [comment, setComment] = useState("");

    const comments = useSelector((state) => state.comments);

    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [comments]);

    const sendComment = (e) => {
        e.preventDefault();
        socket.emit("comment", comment);
        setComment("");
    };

    return (
        <>
            <h2 id="commentHeadline">Comments:</h2>
            <div className="comment">
                <div className="comments" ref={ref}>
                    {comments &&
                        comments.map((comment, index) => (
                            <div className="comment" key={index}>
                                {/* <img
                                    src={comment.profile_pic_url || "/default.png"}
                                /> */}
                                <p>
                                    {new Intl.DateTimeFormat("en-GB", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    }).format(new Date(comment.createdAt))}
                                    <br></br>
                                    <br></br>
                                    &apos;
                                    <strong>
                                        {comment.body}
                                        &apos;{" "}
                                    </strong>
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
