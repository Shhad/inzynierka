import React from 'react'
import { connect } from 'react-redux';

import {getShops, getCategories } from '../../reducers/action-creators';
//Material-UI components
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class FilterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            shops: [],
        };
    };

    componentWillMount() {
        this.props.getShops();
        this.props.getCategories();
    };

    handleChangeCategory = event => {
        this.setState({ categories: event.target.value });
    };

    handleChangeShop = event => {
        this.setState({shops: event.target.value})
    };

    render() {
        const categories = this.props.categoryList;
        const shops = this.props.shopList;
        return (
            <div style={{
                padding: '5px',
                margin: '10px',
                alignItems: 'center',
                alignContent: 'center'
            }}>
                <FormControl style={{
                    width: '200',
                    maxWidth: '300',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <InputLabel htmlFor="select-multiple-chip">Kategorie</InputLabel>
                    <Select
                        multiple
                        value={this.state.categories}
                        onChange={this.handleChangeCategory}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                        style={{
                            minWidth: '200',
                            maxWidth: '300',
                            alignContent: 'center'
                        }}
                        MenuProps={MenuProps}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.name} value={category.name} >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl style={{
                    width: '200',
                    maxWidth: '300'
                }}>
                    <InputLabel htmlFor="select-multiple-chip">Sklepy</InputLabel>
                    <Select
                        multiple
                        value={this.state.shops}
                        onChange={this.handleChangeShop}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {shops.map(shop => (
                            <MenuItem key={shop.name} value={shop.name} >
                                {shop.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shopList: state.getIn(['reducerShop', 'shopList']),
        categoryList: state.getIn(['reducerCategory', 'categoryList'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getShops: () => dispatch(getShops()),
        getCategories: () => dispatch(getCategories())
    }
}

export const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
