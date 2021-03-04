import useStatefulFields from "./hooks/useStatefulFields";
import useAuthSubmit from "./hooks/useAuthSubmit";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/registration", values);

    return (
        <div className="registrationComponent">
            <div>
                {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
                {error && <p>{error}</p>}
                <h1>Registration</h1>
                {/* strategy #2 of binding: arrow functions! Do not forget the () after the function name! */}
                <input
                    onChange={handleChange}
                    name="first"
                    type="text"
                    placeholder="first"
                />
                <br />
                <input
                    onChange={handleChange}
                    name="last"
                    type="text"
                    placeholder="last"
                />
                <br />
                <input
                    onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <br />
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <br />
                <button id='submit' onClick={handleSubmit}>submit</button>
                <br />
            </div>
        </div>
    );
}
