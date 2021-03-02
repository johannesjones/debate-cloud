/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllSubClaims, receiveAllMainClaims } from "./redux/actions";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";

import ProClaimButtonComp from "./ProClaimButton";
import ConClaimButtonComp from "./ConClaimButton";

export default function DebateFrame(props) {
    console.log("Inside DebateFrame");
    //console.log("DEBATE FRAME props", props.match.params.id);

    const [showCommentModal, setshowCommentModal] = useState(false);

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
    console.log("MAIN CLAIM", mainClaim);
    console.log("proSubClaims", proSubClaims);
    console.log("conSubClaims", conSubClaims);

    useEffect(() => {
        console.log("Inside DebateFrame useEffect");
        dispatch(receiveAllSubClaims(id));
        dispatch(receiveAllMainClaims());
        return () => {
            //cleanup;
            console.log("Inside DebateFrame useEffect cleanup");
        };
    }, []);

    return (
        <div className="debateFrameDiv">
            <div className="claimDiv">
                <p>This is the main claim: {mainClaim}</p>
            </div>
            <div className="buttonsDiv">
                <div className="proButtonDiv">
                    <ProClaimButtonComp id={id} />
                </div>
                <div className="conButtonDiv">
                    <ConClaimButtonComp id={id} />
                </div>
            </div>
            <div className="allProClaims">
                <h2>All Pro Claims</h2>
                {proSubClaims &&
                    proSubClaims.map((elem) => {
                        return (
                            <div key={elem._id}>
                                <Link to={`/debate/${elem._id}`}>
                                    {elem.text}
                                    <button
                                        onClick={() =>
                                            setshowCommentModal(true)
                                        }
                                    >
                                        Comment
                                    </button>
                                    <button
                                        onClick={() =>
                                            setshowCommentModal(false)
                                        }
                                    >
                                        Close Comments
                                    </button>
                                    {showCommentModal && <CommentModal />}
                                </Link>
                            </div>
                        );
                    })}
            </div>
            <div className="allConClaims">
                <h2>All Con Claims</h2>
                {conSubClaims &&
                    conSubClaims.map((elem) => {
                        return (
                            <div key={elem._id}>
                                <Link to={`/debate/${elem._id}`}>
                                    {elem.text}
                                    <button
                                        onClick={() =>
                                            setshowCommentModal(true)
                                        }
                                    >
                                        Comment
                                    </button>
                                    <button
                                        onClick={() =>
                                            setshowCommentModal(false)
                                        }
                                    >
                                        Close Comments
                                    </button>
                                    {showCommentModal && <CommentModal />}
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
