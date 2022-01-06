import { useEffect, useState } from "react";
import { API } from "../../backend";
import Base from "../UI/Base";

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        edit: false
    });
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    })
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ token: token, userId: userId })
        fetch(API + `/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json().then(data => { setProfile(data) }).catch()).catch()
    }, [])

    const firstNameChangeHandler = event => {
        setProfile({ ...profile, firstName: event.target.value });
    }

    const lastNameChangeHandler = event => {
        setProfile({ ...profile, lastName: event.target.value });
    }

    const phoneNumberChangeHandler = event => {
        setProfile({ ...profile, phoneNumber: event.target.value });
    }
    const editHandler = event => {
        setProfile({ ...profile, edit: true });
    }

    const submitHandler = event => {
        event.preventDefault();
        return fetch(API + `/user/${userIdAndToken.userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userIdAndToken.token}`
            },
            body: JSON.stringify({
                firstName: profile.firstName,
                lastName: profile.lastName,
                phoneNumber: profile.phoneNumber
            })
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            setProfile({ ...profile, firstName: data.user.firstName, lastName: data.user.lastName, phoneNumber: data.user.phoneNumber, edit: false });
        }).catch(e => console.log(e))).catch(e => console.log(e))
    }

    return (
        <Base>
            {!profile.edit && <div>
                <h1>{profile.firstName} {profile.lastName}</h1>
                <p>{profile.email} {profile.phoneNumber}</p>
                <button onClick={editHandler}>Edit</button>
            </div>}
            {
                profile.edit && <div>
                    <form className="col-md-5 row signup-form" onSubmit={submitHandler}>
                        <div className="signup-form-input">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" name="firstName" onChange={firstNameChangeHandler} defaultValue={profile.firstName} className="form-control"></input>
                        </div>
                        <div className="signup-form-input">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" name="lastName" onChange={lastNameChangeHandler} defaultValue={profile.lastName} className="form-control"></input>
                        </div>
                        <div className="signup-form-input">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" value={profile.email} className="form-control" readOnly></input>
                        </div>
                        <div className="signup-form-input">
                            <label htmlFor="phoneNumber" className="form-label">Phone</label>
                            <input type="tel" name="phoneNumber" onChange={phoneNumberChangeHandler} defaultValue={profile.phoneNumber} className="form-control"></input>
                        </div>
                        <button type="submit" className="btn signup-form-input-button col-6">Submit</button>
                    </form>
                </div>
            }
        </Base>
    )
}

export default Profile;