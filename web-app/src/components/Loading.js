import React from 'react'

//Material-UI components
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loader extends React.Component {

    render() {
        return (
            <div>
                <CircularProgress style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px'
                }} />
            </div>
        );
    }
}
