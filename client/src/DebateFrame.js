/* eslint-disable indent */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveAllSubClaims,
    receiveAllMainClaims,
    receiveHeaderClaim,
} from "./redux/actions";

import ProClaimButtonComp from "./ProClaimButton";
import ConClaimButtonComp from "./ConClaimButton";
import ProSubClaim from "./ProSubClaim";
import ConSubClaim from "./ConSubClaim";

export default function DebateFrame(props) {
    console.log("Inside DebateFrame");
    //console.log("DEBATE FRAME props", props.match.params.id);

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
                        proSubClaims.map((elem, index) => (
                            <ProSubClaim elem={elem} key={index} />
                        ))}
                </div>
                <div className="allConClaims">
                    <h2>All Con Claims</h2>
                    {conSubClaims &&
                        conSubClaims.map((elem, index) => (
                            <ConSubClaim elem={elem} key={index} />
                        ))}
                </div>
            </div>
        </div>
    );
}
