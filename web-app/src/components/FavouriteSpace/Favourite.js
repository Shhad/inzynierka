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
import Loading from '../Loading';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    defaultProps = {

    };

    render() {
        console.log('FAVOURITE');
        console.log(this.props.products);
        const productsList = this.props.products;
        console.log(productsList);
        productsList.map(product => {
            console.log(product.name);
        });
        const nameGroup = 'Grupa: ' + this.props.name + ':';
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
                                {productsList.map(product => <Product id={product.productid} {...product} />)}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

            </div>

        );
    }
}

export default withStyles(styles)(Favourite);
