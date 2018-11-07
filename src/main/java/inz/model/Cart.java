package inz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigInteger;

@Entity
public class Cart {

    // TODO: zmiana na ulubione,
    // @Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger cartId;
    private BigInteger userId;
    private String products;
    private double price;

    public Cart(){}

    public Cart(BigInteger userId, String products, double price) {
        this.userId = userId;
        this.products = products;
        this.price = price;
    }

    public BigInteger getCartId() {
        return cartId;
    }

    public void setCartId(BigInteger cartId) {
        this.cartId = cartId;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }

    public String getProducts() {
        return products;
    }

    public void setProducts(String products) {
        this.products = products;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
