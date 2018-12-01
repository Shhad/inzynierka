import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* Material-UI theme */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



export class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showSideMenu: false,
            dataLoaded: false,
            currentlyFetching: 'userdata'
        };
    }


    render() {
        /*return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Fade>{this.renderState()}</Fade>
            </MuiThemeProvider>
        );*/
        return (
            <div>DZIALAM</div>
        )
    }
}

const AppContainer = connect()(App);
export default AppContainer;
