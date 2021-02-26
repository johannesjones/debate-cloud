import MakeClaimButtonComp from "./makeClaimButtonComp";
import useStatefulFields from "./hooks/useStatefulFields";
import useHandleSubmit from "./hooks/useHandleSubmit";

export default function MakeClaimComp() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useHandleSubmit(values);

    return (
        <div className="makeClaimDiv">
            <div className="makeClaimCard">
                <div className="textareaClaimDiv">
                    {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
                    {error && <p>{error}</p>}
                    <textarea
                        onChange={handleChange}
                        name="claimText"
                        placeholder="Type your claim here..."
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <button onClick={handleSubmit}>MakeClaim</button>
                <MakeClaimButtonComp />
            </div>
        </div>
    );
}
