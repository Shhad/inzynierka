import PropTypes from 'prop-types';
import React from 'react';
import styles from './PageLoader.scss';

const message = [
    'Witamy'
];

export default class PageLoader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            welcome: message[0]
        };
    }

    static propTypes = {
        loading: PropTypes.string
    };

    static defaultProps = {
        loading: ''
    };

    render() {
        return (
            <div className={styles.background} id="page_loader">
                <span className={styles.message}>
                    {`${this.state.welcome}!`}
                </span>
                <img alt="Loading" src="components/resources/loading.gif" />
                <span className={styles.loading}>
                    Loading {this.props.loading}...
                </span>
            </div>
        );
    }
}
