import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div className="logoImgDiv">
            <Link to="/">
                <img className="logoImg" src="/logoDebateCloud.svg" />
            </Link>
        </div>
    );
}
