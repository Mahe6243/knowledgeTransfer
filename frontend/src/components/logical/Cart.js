import { API } from "../../backend"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Base from '../UI/Base';
import CartItem from "./CartItem";
import isAuthenticated from "./Auth";

const Cart = () => {

    let navigate = useNavigate();

    if (!isAuthenticated()) {
        navigate('/signin')
    }

    const [cartItems, setCartItems] = useState([]);
    const [buyCart, setBuyCart] = useState(false);
    const userId = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const removeItemFromCart = (removingItem) => {
        fetch(`${API}/user/${userId}/${removingItem}/1`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                setCartItems(data.cartItems);
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }

    const yesHandler = (event) => {
        fetch(API + `/order/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                products: cartItems,
                owner: userId
            })
        }).then(res => res.json().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                navigate('/profile');
            }
        }).catch(e => console.log(e))).catch(e => console.log(e))
    }

    useEffect(() => {
        let isMounted = true;
        fetch(`${API}/user/cart/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                if (isMounted) setCartItems(data.cartItems)
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
        return () => { isMounted = false; }
    }, [userId, token])



    return (
        <Base>

            <div className="between-header-footer rowc row grid">
                {cartItems.length === 0 && <div><h3>Cart is empty</h3><button onClick={() => navigate('/buybooks')}>Buy books</button></div>}
                {buyCart && <div><h3>Are you sure to buy?</h3><button onClick={yesHandler}>Yes</button><button onClick={() => { setBuyCart(false) }}>No</button></div>}
                {cartItems.length > 0 && <button onClick={() => { setBuyCart(true) }}>Buy all items in cart</button>}
                {cartItems &&
                    cartItems.map(item => <div className='card text-center button-shadow column' key={item + Math.random()}>
                        <CartItem id={item}></CartItem>
                        <button onClick={() => {
                            removeItemFromCart(item);
                        }} className="favorite styled cardbutton text-white button-shadow"
                            type="button">
                            Remove
                        </button></div>)
                }
            </div>
        </Base>
    )
}

export default Cart;