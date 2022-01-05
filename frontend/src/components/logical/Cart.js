import { API } from "../../backend"
import { useEffect, useState } from "react"

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        console.log(token);
        fetch(`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                setCartItems(data.cartItems);
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }, [])



    return (
        <div>
            This is Cart Page here
            {
                cartItems.map(item => <p>{item}</p>)
            }
        </div>
    )
}

export default Cart;