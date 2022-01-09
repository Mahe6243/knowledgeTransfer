import { useEffect, useState } from 'react';
import { API } from '../../backend.js';
import Image from './Image.js';

const CartItem = (props) => {
    const [book, setBook] = useState({
        id: "",
        name: "",
        description: "",
        price: ""
    });
    useEffect(() => {
        fetch(API + `/product/${props.id}`)
            .then(res => {
                res.json().then(data => setBook({ id: data._id, name: data.name, description: data.description, price: data.price }))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            {console.log(book)}
            <Image id={book.id}></Image>
            <h4>{book.name}</h4>
            <p>{book.description}</p>
            <h5>{book.price}</h5>
        </div>
    )
}

export default CartItem;