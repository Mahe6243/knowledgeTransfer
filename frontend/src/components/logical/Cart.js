import { API } from "../../backend"
import { useEffect, useState } from "react"
import Base from '../UI/Base';
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [cartItems, setCartItems] = useState([])
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    });
    const removeItemFromCart = (removingItem) => {
        fetch(`${API}/user/${userIdAndToken.userId}/${removingItem}/1`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${userIdAndToken.token}`
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
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ userId: userId, token: token });
        fetch(`${API}/user/cart/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                setCartItems(data.cartItems)
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }, [])



    return (
        <Base>
            <h5>This is Cart Page here</h5>
            <div  className="between-header-footer button-shadow row grid">
                {cartItems &&
                    cartItems.map(item => <div className='card text-center button-shadow column' key={item}>{item} 
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