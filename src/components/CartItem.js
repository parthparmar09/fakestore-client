import React,{useState , useContext} from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function CartItem(props) {

  const { addToCart , getCart , giveAlert } = useContext(UserContext);

    const {id , title , price  , image , qty} =  props.product

    const [quantity , setQuantity] = useState(qty)


    const handleRemove = () => {
      fetch(`${process.env.REACT_APP_BASE_URL}cart/${id}` , {
        method : "DELETE" , 
        headers : {
          "authorization" : `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(res => res.json()).then(data => {
        if(!data.success){
          return giveAlert('danger' ,  data.msg)
        }
        giveAlert('success' , data.msg)
        getCart()
      }).catch(err => console.log(err))
    }

    const qtyMinus = (e) => {
      setQuantity(quantity-1)
      addToCart(id ,  title , image ,  price , quantity-1 )
    }
    const qtyPlus = (e) => {
      setQuantity(quantity+1)
      addToCart(id ,  title , image ,  price , quantity+1 )

    }

    return (
      <div className="d-flex my-2 product-item rounded w-100 row">
        <div className='p-1 col-3' >
          <img className='image-fluid cart-image' src={image} alt=""  />
        </div>
        <div className=" d-flex flex-column my-3 col-6">
          <h4 className=''>&#8377; {price}</h4>
          <h5 className='text-muted'>{title.slice(0,25)}...</h5>
          <div className="mt-auto">
          <Link className='link-secondary ' to='' onClick={handleRemove} >remove</Link>
          <Link className='link-success ms-3' to={`/product/${id}`}>view</Link>
          </div>
        </div>
        <div className="my-auto col-3 ">
          <div className="d-flex ">
            <button className="btn" onClick={qtyMinus} >-</button>
            <h4 className='border border-secondary rounded text-center' style={{width : '30px'}}>{quantity}</h4>
            <button className="btn" onClick={qtyPlus}>+</button>
          </div>
          <h3 className="text-muted">
          &#8377; {price * quantity}
          </h3>
        </div>
      </div>
  )
}
 