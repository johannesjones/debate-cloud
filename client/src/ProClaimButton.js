import { useState, useEffect } from "react";
import MakeClaimComp from "./MakeClaimComp";

export default function ProClaimButtonComp() {
    console.log("Inside ProClaimButtonComp");
    const [showMakeClaim, setShowMakeClaim] = useState(false);

    useEffect(() => {
        console.log("Inside ProClaimButtonComp useEffect");
        //effect;
        return () => {
            //cleanup;
            console.log("Inside ProClaimButtonComp useEffect cleanup");
        };
    }, [showMakeClaim]);

    return (
        <div className="proClaimButtonDiv">
            <button onClick={setShowMakeClaim(true)} className="proClaimButton">
                Make Pro Claim
            </button>
            {showMakeClaim && <MakeClaimComp />}
        </div>
    );
}
