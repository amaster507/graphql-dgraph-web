import React from 'react';
import {Form } from 'react-bootstrap';
import {Images} from '../../../images';

import './style.scss';

function SearchBar()
{
    return (
        <div className="search-bar-container">
            <Form bsPrefix="document-search-bar"> 
            <Form.Control type="text" placeholder="Search documentation..."  bsPrefix="search-text-box" />
            </Form>
        </div>
    )
}

export default SearchBar;