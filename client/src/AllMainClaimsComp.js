import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveAllMainClaims } from "./redux/actions";
import { Link } from "react-router-dom";

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
                        allMainClaims.map((elem) => {
                            return (
                                <div className="mainClaimCard" key={elem._id}>
                                    <Link to={`/debate/${elem._id}`}>
                                        {elem.text}
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            }
        </div>
    );
}
