import { useEffect, useState } from "react";
import Base from "../UI/Base";
import { API } from "../../backend";
import { useNavigate } from 'react-router-dom'

function Signin() {

    let navigate = useNavigate();

    useEffect(() => navigate('/signin'), []);


    const [values, setValues] = useState({
        email: "",
        password: "",
        error: ""
    });

    const { email, password, error } = values;

    const emailChangeHandler = event => {
        setValues({ ...values, email: event.target.value });
    }
    const passwordChangeHandler = event => {
        setValues({ ...values, password: event.target.value });
    }

    const errorMessage = () => {
        return (<div style={{ display: error ? "" : "none" }}>{
            error
        }
        </div>)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        return fetch(API + '/signin', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            res.json().then(data => {
                if ('error' in data) {
                    setValues({ ...values, error: data.error })
                } else {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.user._id)
                    navigate('/');
                }
            }).catch(e => console.log(e));
        }).catch(e => {
            console.log('outer catch');
        });
    }
    return (
        <Base>
            <div className="row">
                {errorMessage()}
                <form className="col-md-5 row signup-form" onSubmit={submitHandler}>
                    <div className="signup-form-input">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" onChange={emailChangeHandler} value={email} className="form-control"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="password" className="form-label">password</label>
                        <input type="password" name="password" onChange={passwordChangeHandler} value={password} className="form-control"></input>
                    </div>
                    {error && <div>{error}</div>}
                    <button type="submit" className="btn signup-form-input-button col-6">Submit</button>
                </form>
            </div>
        </Base>
    )
}

export default Signin;