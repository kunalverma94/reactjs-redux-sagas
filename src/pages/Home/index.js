import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const response = await api.get('products');

        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }));

        this.setState({
            products: data,
        });
    }

    handleAddProduct = product => {
        console.tron.log(product);
        // here using the bindActionCreators we can use the action directly from the props
        const { addToCart } = this.props;
        addToCart(product);

        // const { dispatch } = this.props;
        // dispatch(CartActions.addToCart(product));
    };

    render() {
        const { products } = this.state;
        return (
            <ProductList>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>

                        <button
                            type="button"
                            onClick={() => this.handleAddProduct(product)}
                        >
                            <div>
                                <MdAddShoppingCart size={16} color="#FFF" /> 3
                                <span>Adicionar ao carrinho</span>
                            </div>
                        </button>
                    </li>
                ))}
            </ProductList>
        );
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home);
