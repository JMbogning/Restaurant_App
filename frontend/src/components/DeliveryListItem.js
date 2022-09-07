import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryListItem = ({id, name, address}) => {
    return (
        <li className="item">
            <Link to={`/order/${id}/view`}>
                <div className="product-img">
                    <h1 ><i className="bi bi-lightning"  /></h1>
                </div>
                <div className="product-info">
                <span className="product-title form-control">{name} - {address}
                <span className="badge badge-info float-right"> #: {id}</span></span>
                
                </div>
            </Link> 
        </li>
     );
}
 
export default DeliveryListItem;