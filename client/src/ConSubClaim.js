import { useState } from "react";

import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import RatingModal from "./RatingModal";

export default function ProSubClaim({ elem, key }) {
    console.log("INSIDE ProSubClaim", elem);

    const [showConCommentModal, setshowConCommentModal] = useState(false);
    const [showRatingModal, setshowRatingModal] = useState(false);

    return (
        <div key={key} className="subClaimCard">
            <Link to={`/debate/${elem._id}`}>
                <button className="eachSubClaim">{elem.text}</button>
            </Link>
            <button
                onClick={() => setshowConCommentModal(true)}
                className="showCommentModal"
                type="submit"
            >
                <img src="/showCommentModal.png" alt="submit" />
            </button>

            {showConCommentModal && (
                <div>
                    <button
                        onClick={() => setshowConCommentModal(false)}
                        type="submit"
                    >
                        X
                    </button>
                    <CommentModal id={elem._id} />
                </div>
            )}
            <button onClick={() => setshowRatingModal(true)} type="submit">
                Rate
            </button>
            {showRatingModal && (
                <div>
                    <button
                        onClick={() => setshowRatingModal(false)}
                        type="submit"
                    >
                        X
                    </button>
                    <RatingModal id={elem._id} />
                </div>
            )}
        </div>
    );
}
