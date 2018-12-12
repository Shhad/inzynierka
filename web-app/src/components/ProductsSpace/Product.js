import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { productid, url, name,  desc, shop } = this.props;
        const price = 'Cena: ' + this.props.price + ' ' + this.props.currency;
        const shopp = 'Sklep: ' + this.props.shopid;
        return (
            <div style={{
                float: 'left',
                margin: '20px'
            }}>
                <Card style={{width: '345px'}} >
                    <CardActionArea>
                        <CardMedia
                            style={{
                                height: '140px'
                            }}
                            image={this.props.url}
                            title="Shopping"
                        />
                        <CardContent style={{
                            height: '120px'
                        }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.name}
                            </Typography>
                            <Typography component="h4">
                                {price}
                            </Typography>
                            <Typography component="p">
                                {shopp}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={this.handleClickOpen} size="small" color="primary">
                            Więcej
                        </Button>
                    </CardActions>
                </Card>

                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <img src={this.props.url} alt={'Product pic'} style={{
                                width: '100%',
                                maxWidth: '500px'
                            }}/>
                        </DialogContentText>
                        <Divider/>
                        <DialogContentText id={'product-price'} style={{
                            fontWeight: 800,
                            color: '#333333'
                        }}>
                            Cena: {this.props.price} {this.props.currency}
                        </DialogContentText>
                        <DialogContentText id ={'product-desc'} style={{
                            fontWeight: 600,
                            color: '#333333',
                            fontStyle: 'italic'
                        }}>
                            Opis:
                        </DialogContentText>
                        <DialogContentText id ={'product-desc'} style={{
                            fontWeight: 200,
                            color: '#333333',
                            fontStyle: 'italic'
                        }}>
                            {this.props.description}
                        </DialogContentText>

                        <DialogContentText id ={'product-desc'} style={{
                            fontWeight: 400,
                            color: '#333333',
                            fontStyle: 'italic'
                        }}>
                            {this.props.link}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
                        </Button>
                        <Button color='primary'>
                            Modyfikuj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}

export default withStyles(styles)(Product);
