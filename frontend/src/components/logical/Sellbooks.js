import { useState, useEffect } from 'react';
import Base from '../UI/Base';
import { API } from '../../backend';
import { useNavigate } from 'react-router-dom';

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
    const postedBooksHandler = event => {
        navigate('/addedbooks');
    }
    const anotherBookHandler = event => {
        setBook({ name: "", description: "", price: "", success: false });
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
            {!book.success && <form onSubmit={submitHandler}>
                <div className="signup-form-input">
                    <label htmlFor="name" className="form-label">Book Name</label>
                    <input type="text" name="name" onChange={nameChangeHandler} value={book.name} className="form-control"></input>
                </div>
                <div className="signup-form-input">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text-area" name="description" onChange={descriptionChangeHandler} value={book.description} className="form-control"></input>
                </div>
                <div className="signup-form-input">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" name="price" onChange={priceChangeHandler} value={book.price} className="form-control"></input>
                </div>
                <button type='submit'>Add</button>
            </form>}
            {book.success && <div>
                <h1>Book added successfully.</h1>
                <button onClick={postedBooksHandler}>Posted Books</button>
                <button onClick={anotherBookHandler}>Add another book?</button>
            </div>}
        </Base>
    )
}

export default Sellbooks;