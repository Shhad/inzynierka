package inz.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "favouriteproducts")
public class FavouriteProducts implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "favouritedid")
    private BigInteger favouriteId;

    @Column(name = "productid")
    private BigInteger productId;

    public FavouriteProducts() {}

    public FavouriteProducts(BigInteger favouriteId, BigInteger productId) {
        this.favouriteId = favouriteId;
        this.productId = productId;
    }

    public BigInteger getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(BigInteger favouriteId) {
        this.favouriteId = favouriteId;
    }

    public BigInteger getProductId() {
        return productId;
    }

    public void setProductId(BigInteger productId) {
        this.productId = productId;
    }
}
