import { useState, useEffect } from "react";
import MakeClaimComp from "./MakeClaimComp";

export default function ConClaimButtonComp({ id }) {
    console.log("Inside ProClaimButtonComp");
    console.log("ID PRO CLAIM BUTTON", id);
    const [showMakeClaim, setShowMakeClaim] = useState(false);

    useEffect(() => {
        console.log("Inside ProClaimButtonComp useEffect");
        //effect;
        return () => {
            //cleanup;
            console.log("Inside ProClaimButtonComp useEffect cleanup");
        };
    }, []);

    return (
        <div className="conClaimButtonDiv">
            <button
                onClick={() => setShowMakeClaim(true)}
                className="conClaimButton"
            >
                Make Con Claim
            </button>
            <button
                onClick={() => setShowMakeClaim(false)}
                className="proClaimButton"
            >
                X
            </button>
            {showMakeClaim && <MakeClaimComp id={id} type={"0"} />}
        </div>
    );
}
