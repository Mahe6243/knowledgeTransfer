import { useState, useEffect } from 'react';
import Base from '../UI/Base';
import { API } from '../../backend';
import { useNavigate } from 'react-router-dom';
import Card from "../UI/Card";

const Sellbooks = () => {
    let navigate = useNavigate();
    const [book, setBook] = useState({
        name: "",
        description: "",
        price: "",
        success: false
    });
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    })

    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ token: token, userId: userId })
    }, [])
    const nameChangeHandler = (event) => {
        setBook({ ...book, name: event.target.value })
    }
    const descriptionChangeHandler = (event) => {
        setBook({ ...book, description: event.target.value })
    }
    const priceChangeHandler = (event) => {
        setBook({ ...book, price: event.target.value })
    }

    const anotherBookHandler = event => {
        setBook({ name: "", description: "", price: "", success: false });
    }
    const addedBooksHandler = event => {
        navigate('/addedbooks');
    }
    const submitHandler = event => {
        event.preventDefault();
        return fetch(API + `/product/${userIdAndToken.userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userIdAndToken.token}`
            },
            body: JSON.stringify({
                name: book.name,
                description: book.description,
                price: book.price
            })
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error("Cant add book")
            }
            setBook({ ...book, success: true })
        }).catch()).catch()
    }
    return (
        <Base>
           <Card className='signin-card col-sm-7'>
            {!book.success && <form onSubmit={submitHandler}>
            
                <div className="signup-form-input">
                    <label htmlFor="name" className="form-label"><h5>Book Name</h5></label>
                    <input type="text" name="name" onChange={nameChangeHandler} value={book.name} className="form-control  border border-secondary"></input>
                </div>
                <div className="signup-form-input">
                    <label htmlFor="description" className="form-label"><h5>Description</h5></label>
                    <input type="text-area" name="description" onChange={descriptionChangeHandler} value={book.description} className="form-control  border border-secondary"></input>
                </div>
                <div className="signup-form-input">
                    <label htmlFor="price" className="form-label"><h5>Price</h5></label>
                    <input type="number" name="price" onChange={priceChangeHandler} value={book.price} className="form-control  border border-secondary"></input>
                </div>
                <button type='submit' className='btn-gradient button-shadow signup-form-input-button font-weight-bold text-white col-3'>Add</button>
            </form>}
            {book.success && <div className='row'>
                <h1>Book added successfully.</h1>
                <button className='btn-gradient button-shadow signup-form-input-button font-weight-bold text-white col-md-3' onClick={addedBooksHandler}>Added Books</button>
                <button className='btn-gradient button-shadow signup-form-input-button font-weight-bold text-white col-md-3' onClick={anotherBookHandler}>Add another book?</button>
            </div>}
            </Card>
        </Base>
    )
}

export default Sellbooks;