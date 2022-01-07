import { useEffect, useState } from "react";
import { API } from "../../backend";
import Base from "../UI/Base";

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
            <div className="between-header-footer">
                {books.map(book => <div key={book.description + book.price + Math.random()}>
                    <h4>{book.name}</h4>
                    <p>{book.description}</p>
                    <h5>{book.price}</h5>
                    <button onClick={() => addToCartHandler(book._id)}>Add to cart</button></div>)}
            </div>
        </Base>
    )


}

export default Buybooks;
