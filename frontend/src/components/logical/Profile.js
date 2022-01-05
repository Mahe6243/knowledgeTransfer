
import { Component } from 'react/cjs/react.production.min';
import { API } from '../../backend';
import Base from '../UI/Base';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            profile: {}
        }
    }
    componentDidMount() {
        let userId = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        fetch(API + `/user/${userId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                this.setState({ profile: data })
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    }
    render() {
        const { firstName, lastName, email, phoneNumber, } = this.state.profile;
        return (<Base><div><h1>{firstName} {lastName}</h1><h4>{email}</h4><h4>{phoneNumber}</h4></div></Base>)
    }
}

export default Profile;