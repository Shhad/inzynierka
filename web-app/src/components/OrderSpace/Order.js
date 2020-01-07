import React from 'react';

//Material UI components
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader'

import Product from './Product';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    defaultProps = {

    };

    render() {
        const productsList = this.props.products;
        return (
            <div style={{
                float: 'left',
                margin: '20px'
            }}>

                    <ExpansionPanel style={{
                        width: '800px',
                        maxWidth: '1000px'
                    }}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{this.props.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List
                                component="nav"
                                subheader={<ListSubheader component="div">Produkty</ListSubheader>}
                                style={{
                                    display: 'block',
                                    width: '50%'
                                }}
                            >
                                {productsList.map(product => <Product orderId={this.props.id} productId={product.productId} {...product} />)}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

            </div>

        );
    }
}

export default withStyles(styles)(Order);
