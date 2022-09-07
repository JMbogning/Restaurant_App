import React from 'react';
import { Link } from 'react-router-dom';

const HeaderContent = ({name}) => {
    return (
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="me-auto">
                    <h3 class="page-title">{name}</h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to='/dashboard'><i class="bi bi-house"></i></Link></li>
                                <li class="breadcrumb-item" aria-current="page">Accueil</li>
                                <li class="breadcrumb-item active" aria-current="page">{name}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default HeaderContent