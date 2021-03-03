/* import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { socket } from "./socket"; */

export default function RatingModal({ id }) {
    console.log("Inside RatingModal, Id subClaim: ", id);

    return (
        <>
            <h2 id="ratingHeadline">Rating:</h2>
            <div className="wholeRatingDiv">
                <div className="eachRatingDiv" ref={ref}>
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
                                    {/*                                     {new Intl.DateTimeFormat("en-GB", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    }).format(new Date(comments.createdAt))} */}
                                    <strong>{comment.commentText}</strong>
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
