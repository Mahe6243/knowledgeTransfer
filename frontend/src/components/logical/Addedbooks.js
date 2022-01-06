import { useEffect, useState } from "react";
import { API } from "../../backend";
import Base from "../UI/Base"

const Addedbooks = () => {
    const [addedBooks, setAddedBooks] = useState([]);
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    })
    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ token: token, userId: userId })
        fetch(API + `/product/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error("Cant get added books")
            }
            console.log(data);
            setAddedBooks(data);
        }).catch(e => console.log(e))).catch(e => console.log(e))
    }, [])

    return (
        <Base>
            {addedBooks.length > 0 && addedBooks.map(book => <div key={book.description + book.price}><h4>book.name</h4><h5>book.description</h5><h5>book.price</h5></div>)}
            {addedBooks.length === 0 && <h2>You haven't added any books yet</h2>}
        </Base>
    )
}

export default Addedbooks;