//import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showMakeClaim } from "./redux/actions";

import MakeClaimComp from "./MakeClaimComp";

export default function ProClaimButtonComp({ id }) {
    console.log("Inside ProClaimButtonComp");
    console.log("ID PRO CLAIM BUTTON", id);
    const dispatch = useDispatch();

    //const [showMakeClaim, setShowMakeClaim] = useState(false);
    const showMakeClaimStatus = useSelector((state) => state.showMakeClaim);

    return (
        <div className="proClaimButtonDiv">
            <button
                onClick={() => dispatch(showMakeClaim(true))}
                className="proClaimButton"
            >
                Add Pro Claim
            </button>

            {showMakeClaimStatus && (
                <div>
                    <button
                        onClick={() => dispatch(showMakeClaim(false))}
                        className="proClaimButton"
                    >
                        X
                    </button>
                    <MakeClaimComp id={id} type={"1"} />
                </div>
            )}
        </div>
    );
}
