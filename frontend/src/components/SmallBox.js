import React from 'react';
import { Link } from 'react-router-dom';

const SmallBox = ({ number, paragraph, link, color, icon }) => {
    return (
        <div className={`col ms-3 rounded-0 small-box bg-${color}`} >
            <div className="inner">
                <h3>{number}</h3>
                <p>{paragraph}</p>
            </div>
            <div className="icon">
                <i className={icon} />
            </div>
            <Link to={`/${link}`} className="small-box-footer">Plus d'infos<i className="bi bi-eye" /></Link>
        </div>


    );
}

export default SmallBox;