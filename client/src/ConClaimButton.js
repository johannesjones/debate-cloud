import { useState } from "react";
import MakeClaimComp from "./MakeClaimComp";

export default function ConClaimButtonComp({ id }) {
    console.log("Inside ProClaimButtonComp");
    console.log("ID PRO CLAIM BUTTON", id);
    const [showMakeClaim, setShowMakeClaim] = useState(false);

    return (
        <div className="conClaimButtonDiv">
            <button
                onClick={() => setShowMakeClaim(true)}
                className="conClaimButton"
            >
                Add Con Claim
            </button>

            {showMakeClaim && (
                <div>
                    <button
                        onClick={() => setShowMakeClaim(false)}
                        className="proClaimButton"
                    >
                        X
                    </button>
                    <MakeClaimComp id={id} type={"0"} />
                </div>
            )}
        </div>
    );
}
