import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllSubClaims } from "./redux/actions";

/* import ProClaimButtonComp from "./ProClaimButton"; */
/* import ConClaimButtonComp from "./ConClaimButton"; */

export default function DebateFrame() {
    console.log("Inside DebateFrame");

    const dispatch = useDispatch();
    const proSubClaims = useSelector(
        (state) =>
            state.allSubClaims &&
            state.allSubClaims.filter((allSubClaims) => allSubClaims.pro)
    );
    const conSubClaims = useSelector(
        (state) =>
            state.allSubClaims &&
            state.allSubClaims.filter((allSubClaims) => !allSubClaims.pro)
    );

    useEffect(() => {
        console.log("Inside DebateFrame useEffect");
        dispatch(receiveAllSubClaims());
        return () => {
            //cleanup;
            console.log("Inside DebateFrame useEffect cleanup");
        };
    }, [proSubClaims, conSubClaims]);

    return (
        <div className="debateFrameDiv">
            <div className="claimDiv">
                <p>This is a claim</p>
            </div>
            <div className="buttonsDiv">
                <div className="proButtonDiv">
                    {/* <ProClaimButtonComp /> */}
                </div>
                <div className="conButtonDiv">
                    {/* <ConClaimButtonComp /> */}
                </div>
            </div>
            <div className="allProClaims">
                <h2>All Pro Claims</h2>
                {proSubClaims &&
                    proSubClaims.map((elem, index) => {
                        return (
                            <div key={index}>
                                <p>{elem.claimText}</p>
                            </div>
                        );
                    })}
            </div>
            <div className="allConClaims">
                <h2>All Con Claims</h2>
                {conSubClaims &&
                    conSubClaims.map((elem, index) => {
                        return (
                            <div key={index}>
                                <p>{elem.claimText}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
