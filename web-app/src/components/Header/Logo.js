import PropTypes from 'prop-types';
import React from 'react';
import FlatButton from '@material-ui/core/Button';

import { APP_VERSION } from '../../constants/AppConstants';

import styles from './Logo.scss';

const fullheight = { height: '100%', minWidth: '60px', marginRight: '10px' };

const OwlLogo = ({ onMenuClick }) => {
    const openNewWindow = () => window.open(window.location.href, '_blank');
    return (
        <div className={styles.logo}>
            <FlatButton
                onClick={openNewWindow}
                style={fullheight}
            >
                <img
                    alt="App icon"
                    src="resources/img/shopping_cart.jpg"
                />
            </FlatButton>
            <p id="app-version">
                <span>ShopMe</span>
                <small> v{APP_VERSION}</small>
            </p>
        </div>
    );
};

export default OwlLogo;
