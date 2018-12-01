import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Raven from 'raven-js';

/* Material-UI theme */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import nokiaTheme from './common/nokiaTheme';

/* Components */
import Navigation from './Navigation';
import Modal from './Modal';
import PageLoader from './PageLoader';
import SideMenu from './SideMenu';
import Fade from './common/animations/Fade';
import FloatingAdd from './FloatingActions/FloatingAdd';
import WindowUnloadHandler from './WindowUnloadHandler';
import AdminPanel from './AdminPanel/AdminPanel';
import Snacks from './Snacks';
import { REPORT, REPORT_STARRED, EXAMPLE, TEMPLATE } from '../constants/ReportClasses';


/* Actions */
import { fetchUserdata } from '../actions/userdataActions';
import { fetchTestingDatasets } from '../actions/datasetsActions';
import * as ReportsActions from '../actions/reports/reportsActions';
import { openModal } from '../actions/modalActions';
import { displayChangelog } from '../actions/changelogActions';

import styles from './App.scss';

export class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showSideMenu: false,
            dataLoaded: false,
            currentlyFetching: 'userdata'
        };
    }

    static propTypes = {
        shops: PropTypes.object,
        promotionProducts: PropTypes.object.isRequired,
        //---------------------------------------------------
        filteringEnabled: PropTypes.bool.isRequired,
        userdataActions: PropTypes.shape({
            fetchUserdata: PropTypes.func.isRequired
        }).isRequired,
        reportsActions: PropTypes.shape({
            refreshTree: PropTypes.func.isRequired
        }).isRequired,
        changelogActions: PropTypes.shape({
            displayChangelog: PropTypes.func.isRequired
        }).isRequired,
        testingDatasetsActions: PropTypes.shape({
            fetchTestingDatasets: PropTypes.func.isRequired
        }).isRequired,
        openedReports: ImmutablePropTypes.orderedMap.isRequired,
        openedReportId: PropTypes.string,
        username: PropTypes.string,
        fullname: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        openedReportId: '',
        username: '',
        fullname: '',
        children: undefined
    };

    componentDidMount() {
        this.runFetchDataChain();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.dataLoaded && this.state.dataLoaded) {
            this.props.changelogActions.displayChangelog();
        }
    }

    runFetchDataChain() {
        this.props.userdataActions.fetchUserdata()
            .then(() => {
                this.setState({ currentlyFetching: 'datasets' });
                return this.props.testingDatasetsActions.fetchTestingDatasets();
            })
            .then(() => {
                this.setState({ currentlyFetching: REPORT });
                return this.props.reportsActions.refreshTree(REPORT);
            })
            .then(() => {
                this.setState({ currentlyFetching: EXAMPLE });
                return this.props.reportsActions.refreshTree(EXAMPLE);
            })
            .then(() => {
                this.setState({ currentlyFetching: TEMPLATE });
                return this.props.reportsActions.refreshTree(TEMPLATE);
            })
            .then(() => {
                this.setState({ currentlyFetching: REPORT_STARRED });
                return this.props.reportsActions.refreshTree(REPORT_STARRED, null, this.props.username);
            })
            .then(() => {
                if (!DEV) {
                    Raven.setUserContext({
                        username: this.props.fullname
                    });
                }
                this.setState({ dataLoaded: true });
            });
    }

    onMenuClick = () => {
        this.setState({ showSideMenu: !this.state.showSideMenu });
    };

    renderState() {
        if (!this.state.dataLoaded) {
            return (
                <PageLoader
                    key="loading"
                    loading={this.state.currentlyFetching}
                />
            );
        }

        const marginTop = this.props.filteringEnabled ? 140 : 90;

        const contentClasses = classNames({
            [styles.content]: true,
            //[styles['show-side-menu']]: this.state.showSideMenu,
            //[styles['filtering-enabled']]: this.props.filteringEnabled
        });

        return (
            <div
                key="loaded"
                className={styles.container}
            >
                <Navigation onMenuClick={this.onMenuClick} />
                <SideMenu
                    show={this.state.showSideMenu}
                    marginTop={marginTop}
                    openedReportId={this.props.openedReportId}
                />
                <div className={contentClasses}>
                    {this.props.children}
                </div>
                <FloatingAdd />
                <AdminPanel />
                <Modal />
                <Snacks />
                <WindowUnloadHandler confirmClose={!this.props.openedReports.isEmpty()} />
            </div>
        );
    }

    render() {
        const muiTheme = getMuiTheme(nokiaTheme);
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

const mapStateToProps = (state, ownProps) => ({
    fullname: state.userdata.get('fullname'),
    username: state.userdata.get('username'),
    filteringEnabled: state.sideMenu.getIn(['filtering', 'enabled']),
    openedReportId: ownProps.params.id,
    openedReports: state.workspace
});

const mapDispatchToProps = dispatch => ({
    userdataActions: bindActionCreators({ fetchUserdata }, dispatch),
    reportsActions: bindActionCreators(ReportsActions, dispatch),
    modalActions: bindActionCreators({ openModal }, dispatch),
    changelogActions: bindActionCreators({ displayChangelog }, dispatch),
    testingDatasetsActions: bindActionCreators({ fetchTestingDatasets }, dispatch)
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
