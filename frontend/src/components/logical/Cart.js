import { API } from "../../backend"
import { useEffect, useState } from "react"
import Base from '../UI/Base';
import CartItem from "./CartItem";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
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
            <h5>This is Cart Page here</h5>
            <div className="between-header-footer row grid">
                {cartItems &&
                    cartItems.map(item => <div className='card text-center button-shadow column' key={item}>
                        <CartItem id={item}></CartItem>
                        <button onClick={() => {
                            removeItemFromCart(item);
                        }} className="favorite styled signup-form-input-button text-white button-shadow"
                            type="button">
                            Remove
                        </button></div>)
                }
            </div>
        </Base>
    )
}

export default Cart;