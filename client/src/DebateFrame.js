/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveAllSubClaims,
    receiveAllMainClaims,
    receiveHeaderClaim,
} from "./redux/actions";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import RatingModal from "./RatingModal";

import ProClaimButtonComp from "./ProClaimButton";
import ConClaimButtonComp from "./ConClaimButton";

export default function DebateFrame(props) {
    console.log("Inside DebateFrame");
    //console.log("DEBATE FRAME props", props.match.params.id);

    const [showProCommentModal, setshowProCommentModal] = useState(false);
    const [showConCommentModal, setshowConCommentModal] = useState(false);
    const [showRatingModal, setshowRatingModal] = useState(false);

    const dispatch = useDispatch();
    const id = props.match.params.id;
    console.log("ID INSIDE DEBATE FRAME", id);
    const proSubClaims = useSelector((state) =>
        state.allSubClaims
            ? state.allSubClaims.filter(
                  (allSubClaims) => allSubClaims.type === "1"
              )
            : []
    );
    const conSubClaims = useSelector((state) =>
        state.allSubClaims
            ? state.allSubClaims.filter(
                  (allSubClaims) => allSubClaims.type === "0"
              )
            : []
    );
    const mainClaim = useSelector((state) =>
        state.allMainClaims
            ? state.allMainClaims.filter(
                  (allMainClaims) => allMainClaims._id === id
              )[0]?.text
            : []
    );

    const headerClaim = useSelector((state) => state.headerClaim);

    console.log("MAIN CLAIM", mainClaim);
    console.log("proSubClaims", proSubClaims);
    console.log("conSubClaims", conSubClaims);

    useEffect(() => {
        dispatch(receiveHeaderClaim(id));
        dispatch(receiveAllSubClaims(id));
        dispatch(receiveAllMainClaims());

        return () => {
            //cleanup;
            console.log("Inside DebateFrame useEffect cleanup");
        };
    }, []);

    return (
        <div className="debateFrameDiv">
            <div className="mainClaimDiv">
                <h1>{headerClaim ? headerClaim.text : mainClaim}</h1>
            </div>
            <div className="buttonsDiv">
                <div className="proButtonDiv">
                    <ProClaimButtonComp id={id} />
                </div>
                <div className="conButtonDiv">
                    <ConClaimButtonComp id={id} />
                </div>
            </div>
            <div className="allSubClaims">
                <div className="allProClaims">
                    <h2>All Pro Claims</h2>
                    {proSubClaims &&
                        proSubClaims.map((elem) => {
                            return (
                                <div key={elem._id} className="subClaimCard">
                                    <Link to={`/debate/${elem._id}`}>
                                        <button className="eachSubClaim">
                                            {elem.text}
                                        </button>
                                    </Link>
                                    <div className="showCommentModal">
                                        <button
                                            onClick={() =>
                                                setshowProCommentModal(true)
                                            }
                                            type="submit"
                                        >
                                            <img
                                                src="/showCommentModal.png"
                                                alt="submit"
                                            />
                                        </button>
                                    </div>
                                    {showProCommentModal && (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    setshowProCommentModal(
                                                        false
                                                    )
                                                }
                                                type="submit"
                                            >
                                                X
                                            </button>
                                            <CommentModal
                                                id={elem._id}
                                                comments={elem.comments}
                                            />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setshowRatingModal(true)}
                                        type="submit"
                                    >
                                        Rate
                                    </button>
                                    {showRatingModal && (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    setshowRatingModal(false)
                                                }
                                                type="submit"
                                            >
                                                X
                                            </button>
                                            <RatingModal id={elem._id} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
                <div className="allConClaims">
                    <h2>All Con Claims</h2>
                    {conSubClaims &&
                        conSubClaims.map((elem) => {
                            return (
                                <div key={elem._id} className="subClaimCard">
                                    <Link to={`/debate/${elem._id}`}>
                                        <button className="eachSubClaim">
                                            {elem.text}
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            setshowConCommentModal(true)
                                        }
                                        className="showCommentModal"
                                        type="submit"
                                    >
                                        <img
                                            src="/showCommentModal.png"
                                            alt="submit"
                                        />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setshowConCommentModal(false)
                                        }
                                        type="submit"
                                    >
                                        X
                                    </button>
                                    {showConCommentModal && (
                                        <CommentModal id={elem._id} />
                                    )}
                                    <button
                                        onClick={() => setshowRatingModal(true)}
                                        type="submit"
                                    >
                                        Rate
                                    </button>
                                    <button
                                        onClick={() =>
                                            setshowRatingModal(false)
                                        }
                                        type="submit"
                                    >
                                        X
                                    </button>
                                    {showRatingModal && (
                                        <RatingModal id={elem._id} />
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
