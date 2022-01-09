import { useEffect, useState } from "react";
import { API } from "../../backend";

const Image = (props) => {
    const [image, setImage] = useState("");
    useEffect(() => {
        setImage(`${API}/product/image/${props.id}`)
    }, [])

    return (
        <div>
            <img src={image} alt="book" height="200px" width="200px"></img>
        </div>
    );
}

export default Image;