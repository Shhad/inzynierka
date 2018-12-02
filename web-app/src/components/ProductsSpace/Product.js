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

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Product extends React.Component {

    render() {
        const { id, url, name,  desc, shop } = this.props;
        return (
            <div style={{
                float: 'left',
                margin: '20px'
            }}>
                <Card style={{maxWidth: '345px'}} >
                    <CardActionArea>
                        <CardMedia
                            style={{
                                height: '140px'
                            }}
                            image={this.props.url}
                            title="Shopping"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.name}
                            </Typography>
                            <Typography component="p">
                                {this.props.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Więcej
                        </Button>
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default withStyles(styles)(Product);
