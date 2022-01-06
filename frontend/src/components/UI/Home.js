import Base from './Base';
import Card from "./Card";

const Home = () => {
    return (
        <Base>
           <Card className="col-md-14 p-5 text-white home">
               <h1 className='text-center'>KNOWLEDGE TRANSFER</h1>
               <h6 className='text-center'>Resell your books </h6>
               <button type="submit" 
               className="btn3d signup-form-input-button homebutton1 rounded text-white col-3">
                SELL BOOKS</button>
                <button type="submit" 
               className="btn3d signup-form-input-button homebutton2 rounded text-white col-3">
                BUY BOOKS</button>
           </Card>
        </Base>
    );
}

export default Home;