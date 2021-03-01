import { Link } from "react-router-dom";
import useStatefulFields from "./hooks/useStatefulFields";
import useAuthSubmit from "./hooks/useAuthSubmit";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", values);

    return (
        <div className="loginComponent">
            {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
            {error && <p>{error}</p>}
            <h1>Login</h1>
            {/* strategy #2 of binding: arrow functions! Do not forget the () after the function name! */}
            <input
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="email"
            />
            <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="password"
            />
            <button onClick={handleSubmit}>submit</button>
            <Link to="/">Register!</Link>
            <Link to="/reset-password">Reset Password!</Link>
        </div>
    );
}
