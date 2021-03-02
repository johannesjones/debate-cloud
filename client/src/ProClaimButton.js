import { useState, useEffect } from "react";
import MakeClaimComp from "./MakeClaimComp";

export default function ProClaimButtonComp({ id }) {
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
        <div className="proClaimButtonDiv">
            <button
                onClick={() => setShowMakeClaim(true)}
                className="proClaimButton"
            >
                Make Pro Claim
            </button>
            <button
                onClick={() => setShowMakeClaim(false)}
                className="proClaimButton"
            >
                X
            </button>
            {showMakeClaim && <MakeClaimComp id={id} type={"1"} />}
        </div>
    );
}
