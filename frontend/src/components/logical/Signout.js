//import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
function Signout() {
    localStorage.removeItem('token')
    return (<Signin />);
}

export default Signout;