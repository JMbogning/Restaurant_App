import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/layout/Navbar';

const NotFound = () => {
    return ( 
        <NavBar>
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <h4 className='text-center mb-2 mb-sm-5'>Page Non Trouvée</h4>
                        <img 
                            style={{ witdh: "50%", height: "200px", objectFit: "contain" }}
                            src="/assets/images/logo.jpeg"
                            alt="Non trouvé"
                        />
                        <button className='col-md-3 col-sm-6 col-12 btn btn-primary mt-15'>
                            <Link to="/" className='text-white text-decoration-none'>
                                Page d'accueil
                            </Link>
                        </button>

                </div>
            </div>

        </NavBar>
            
    );
}
 
export default NotFound;