import { useEffect, useState } from "react";
import { API } from "../../backend";
import Base from "../UI/Base";
import Card from "../UI/Card";

const Buybooks = () => {
    const [books, setBooks] = useState([]);
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    });
    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ userId: userId, token: token });
        fetch(API + `/product`, {
            method: 'GET'
        }).then(res => res.json().then(data => setBooks(data.products)).catch(e => console.log(e))).catch(e => console.log(e))
    }, [])
    const addToCartHandler = (id) => {
        fetch(API + `/user/${userIdAndToken.userId}/${id}/0`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userIdAndToken.token}`
            }
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error(data.error)
            }

        }).catch(e => console.log(e))).catch(e => console.log(e))
    }
    return (
        <Base>
            <div className="between-header-footer rowc row grid">
                    {books.map(book => <div key={book.description + book.price + Math.random()}>
                    <div className='card text-center column'>
                        <h4>{book.name}</h4>
                        <p>{book.description}</p>
                        <h5>{book.price}</h5>
                        <button className="signup-form-input-button text-white button-shadow" onClick={() => addToCartHandler(book._id)}>Add to cart</button>
                    </div>
            </div>)}
                 
            </div>
        </Base>
    )


}

export default Buybooks;
