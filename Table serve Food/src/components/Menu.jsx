import React , {useState} from 'react'
function Menu({menu}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className='row bs'>
        <div className='col-md-4'>
            <img src={menu.image} className='snelling'/>
        </div>
        <div className='col-md-4'>
            <h1>{menu.name}</h1>
            <b>
                {" "}

                <p>price : {menu.price}</p>
                <p>Availbale : {menu.available}</p>
            </b>

            <div style={{ float: "right"}}>
                <button className='btn btn-primary'>Add to cart</button>
            </div>
        </div>
    </div>
    
  )
}

export default Menu