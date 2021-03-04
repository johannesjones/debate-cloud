//import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showProMakeClaim } from "./redux/actions";

import MakeClaimComp from "./MakeClaimComp";

export default function ProClaimButtonComp({ id }) {
    console.log("Inside ProClaimButtonComp");
    console.log("ID PRO CLAIM BUTTON", id);
    const dispatch = useDispatch();

    //const [showMakeClaim, setShowMakeClaim] = useState(false);
    const showMakeProClaimStatus = useSelector(
        (state) => state.showProMakeClaim
    );

    return (
        <div className="proClaimButtonDiv">
            <button
                onClick={() => dispatch(showProMakeClaim(true))}
                className="proClaimButton"
            >
                <img src="/ProClaimButton.png" />
            </button>

            {showMakeProClaimStatus && (
                <div className="proClaimButton">
                    <button id='closeProClaimButton'
                        onClick={() => dispatch(showProMakeClaim(false))}
                    >
                        close
                    </button>
                    <MakeClaimComp id={id} type={"1"} />
                </div>
            )}
        </div>
    );
}
