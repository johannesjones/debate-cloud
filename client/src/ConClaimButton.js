//import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showConMakeClaim } from "./redux/actions";
import MakeClaimComp from "./MakeClaimComp";

export default function ConClaimButtonComp({ id }) {
    console.log("Inside ProClaimButtonComp");
    console.log("ID PRO CLAIM BUTTON", id);
    const dispatch = useDispatch();

    //const [showMakeClaim, setShowMakeClaim] = useState(false);
    const showMakeConClaimStatus = useSelector(
        (state) => state.showConMakeClaim
    );

    return (
        <div className="conClaimButtonDiv">
            <button
                onClick={() => dispatch(showConMakeClaim(true))}
                className="conClaimButton"
            >
                Add Con Claim
            </button>

            {showMakeConClaimStatus && (
                <div>
                    <button
                        onClick={() => dispatch(showConMakeClaim(false))}
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
