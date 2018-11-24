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
    private Integer cartId;

    @Column(name = "favouriteid", nullable = false)
    private Integer favouriteId;

    @Column(name = "shopid", nullable = false)
    private Integer shopId;

    @Column(name = "price",nullable = false)
    private double price;
    
    @Column(name = "name", nullable = false)
    private String name;

    public Cart(){}

    public Cart(Integer favouriteId, Integer shopId, double price) {
        this.favouriteId = favouriteId;
        this.shopId = shopId;
        this.price = price;
    }

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(Integer favouriteId) {
        this.favouriteId = favouriteId;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
