import { useState } from "react";
import Base from "../UI/Base";
import { API } from '../../backend';

const Signup = () => {

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        error: "",
        success: false
    });

    const { firstName, lastName, email, password, phoneNumber, error, success } = values;

    const firstNameChangeHandler = event => {
        setValues({ ...values, firstName: event.target.value });
    }

    const lastNameChangeHandler = event => {
        setValues({ ...values, lastName: event.target.value });
    }
    const emailChangeHandler = event => {
        setValues({ ...values, email: event.target.value });
    }
    const passwordChangeHandler = event => {
        setValues({ ...values, password: event.target.value });
    }
    const phoneNumberChangeHandler = event => {
        setValues({ ...values, phoneNumber: event.target.value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            error: "",
            success: false
        });
        return fetch(API + '/signup', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                phoneNumber
            })
        }).then(res => res.json().then(data => console.log(data)).catch(e => console.log(e))).catch(e => console.log(e));
    }

    return (
        <Base>
            <div className="row">
                <form className="col-md-5 row signup-form" onSubmit={submitHandler}>
                    <div className="signup-form-input">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" name="firstName" onChange={firstNameChangeHandler} value={firstName} className="form-control"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" name="lastName" onChange={lastNameChangeHandler} value={lastName} className="form-control"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" onChange={emailChangeHandler} value={email} className="form-control"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="password" className="form-label">password</label>
                        <input type="password" name="password" onChange={passwordChangeHandler} value={password} className="form-control"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="phoneNumber" className="form-label">Phone</label>
                        <input type="tel" name="phoneNumber" onChange={phoneNumberChangeHandler} value={phoneNumber} className="form-control"></input>
                    </div>

                    <button type="submit" className="btn signup-form-input-button col-6">Submit</button>
                </form>
            </div>
        </Base>
    )
}

export default Signup;