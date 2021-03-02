import useStatefulFields from "./hooks/useStatefulFields";
import useHandleSubmit from "./hooks/useHandleSubmit";

export default function MakeClaimComp(props) {
    //console.log("PROPS MATCH ID INSIDE MakeClaimComp", props.match.id);
    console.log("PROPS ID INSIDE MakeClaimComp", props.id);

    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useHandleSubmit(
        "/add-claim",
        values,
        props.id,
        props.type
    );
    console.log("VALUES", values);

    return (
        <div className="makeClaimDiv">
            <div className="makeClaimCard">
                <div className="textareaClaimDiv">
                    {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
                    {error && <p>{error}</p>}
                    <textarea
                        onChange={handleChange}
                        name="text"
                        placeholder="Type your claim here..."
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <button onClick={handleSubmit}>MakeClaim</button>
            </div>
        </div>
    );
}

/*
DELETED THIS COMPONENT SINCE IT ONLY MAKES SENCE WITH TEXTAREA. IT'S SIMPLE ENOUGH LIKE THIS.
import MakeClaimButtonComp from "./makeClaimButtonComp";
<MakeClaimButtonComp />
export default function MakeClaimButtonComp() {
    return (
        <div className="makeClaimButtonDiv">
            <button className="makeClaimButton">Make Claim</button>
        </div>
    );
}
*/
