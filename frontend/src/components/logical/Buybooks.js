import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../backend";
import Base from "../UI/Base";
import isAuthenticated from "./Auth";
import Card from "../UI/Card";

const Buybooks = () => {
    let navigate = useNavigate();
    const [books, setBooks] = useState([]);
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
            }).then(res => res.json().then(data => setBooks(data.products)).catch(e => console.log(e))).catch(e => console.log(e))
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
    const addToCartHandler = (id) => {
        if (isAuthenticated()) {
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
            <div className="between-header-footer button-shadow rowc row grid">
                {books && books.map(book => <div key={book.description + book.price + Math.random()}>
                    <div className='card text-center button-shadow column'>
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
