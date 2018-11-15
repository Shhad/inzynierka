package inz.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "cart")
public class Cart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cartid", nullable = false)
    private BigInteger cartId;

    @Column(name = "favouriteid", nullable = false)
    private BigInteger favouriteId;

    @Column(name = "shopid", nullable = false)
    private BigInteger shopId;

    @Column(name = "price",nullable = false)
    private double price;

    public Cart(){}

    public Cart(BigInteger favouriteId, BigInteger shopId, double price) {
        this.favouriteId = favouriteId;
        this.shopId = shopId;
        this.price = price;
    }

    public BigInteger getCartId() {
        return cartId;
    }

    public void setCartId(BigInteger cartId) {
        this.cartId = cartId;
    }

    public BigInteger getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(BigInteger favouriteId) {
        this.favouriteId = favouriteId;
    }

    public BigInteger getShopId() {
        return shopId;
    }

    public void setShopId(BigInteger shopId) {
        this.shopId = shopId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
