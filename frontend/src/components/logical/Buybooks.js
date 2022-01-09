import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../backend";
import Base from "../UI/Base";
import isAuthenticated from "./Auth";
import Card from "../UI/Card";
import Image from "./Image";

const Buybooks = () => {
    let navigate = useNavigate();
    const [books, setBooks] = useState([{
        id: "",
        name: "",
        description: "",
        price: "",
        image: "",
        postedUser: "",
        addedToCart: false
    }]);
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ userId: userId, token: token });

    }, [])

    useEffect(() => {
        if (searchTerm === "") {
            fetch(API + `/product/search/0`, {
                method: 'GET'
            }).then(res => res.json().then(data => {
                let booksArr = data.products.map(product => { product.addedToCart = false; return product })
                setBooks(booksArr);
            }).catch(e => console.log(e))).catch(e => console.log(e))
        }
        else {
            fetch(API + `/product/search/${searchTerm}`, {
                method: 'GET'
            }).then(res => res.json().then(data => setBooks(data.products)).catch(e => console.log(e))).catch(e => console.log(e))
        }
    }, [searchTerm]);

    const searchTermHandler = event => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }
    const addToCartHandler = (book) => {
        if (isAuthenticated()) {
            fetch(API + `/user/${userIdAndToken.userId}/${book._id}/0`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userIdAndToken.token}`
                }
            }).then(res => res.json().then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }
                let otherBooks = books.filter(eachBook => eachBook._id !== book._id);
                book.addedToCart = true;
                setBooks([...otherBooks, book]);
            }).catch(e => console.log(e))).catch(e => console.log(e))
        }
        else {
            navigate('/signin');
        }
    }
    return (
        <Base>
            <Card className="search-card col-sm-4 container">
                <form>
                    <input className="form-control border border-secondary rounded input-lg"
                        placeholder="Search Books..." type='text' name="searchTerm" value={searchTerm}
                        onChange={searchTermHandler}></input>
                </form>
            </Card>
            <div className="between-header-footer rowc row grid">
                {books && books.map(book => <div key={book.description + book.price + Math.random()}>
                    <div className='card text-center button-shadow column'>
                        {console.log(book)}
                        <Image id={book._id}></Image>
                        <h4>{book.name}</h4>
                        <p>{book.description}</p>
                        <h5>{book.price}</h5>
                        {!book.addedToCart && <button className="signup-form-input-button text-white button-shadow" onClick={() => addToCartHandler(book)}>Add to cart</button>}
                        {book.addedToCart && <span>Added to cart</span>}
                    </div>
                </div>)}

            </div>
        </Base>
    )


}

export default Buybooks;
