import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllMainClaims } from "./redux/actions";

export default function AllMainClaimsComp() {
    const dispatch = useDispatch();
    const allMainClaims = useSelector((state) => state.allMainClaims);

    console.log("ALL MAIN CLAIMS", allMainClaims);

    useEffect(() => {
        dispatch(receiveAllMainClaims());

        return () => {
            console.log("cleanup function of MakeClaimComp runs");
        };
    }, []);

    return (
        <div>
            {
                <div className="allMainClaimsDiv">
                    {allMainClaims &&
                        allMainClaims.map((elem, index) => {
                            return (
                                <div className="mainClaimCard" key={index}>
                                    <a href="/debate/${elem}">{elem.text}</a>
                                </div>
                            );
                        })}
                </div>
            }
        </div>
    );
}
