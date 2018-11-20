package inz.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "shopproduct")
public class ShopProduct implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "shopid")
    private Integer shopId;

    @Column(name = "productid")
    private Integer productId;

    public ShopProduct() {}

    public ShopProduct(Integer shopId, Integer productId) {
        this.shopId = shopId;
        this.productId = productId;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
}
