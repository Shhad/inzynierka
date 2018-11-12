package inz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigInteger;

@Entity
@Table(name = "shopproduct")
public class ShopProduct {

    @Column(name = "shopid")
    private BigInteger shopId;

    @Column(name = "productid")
    private BigInteger productId;

    public ShopProduct() {}

    public ShopProduct(BigInteger shopId, BigInteger productId) {
        this.shopId = shopId;
        this.productId = productId;
    }

    public BigInteger getShopId() {
        return shopId;
    }

    public void setShopId(BigInteger shopId) {
        this.shopId = shopId;
    }

    public BigInteger getProductId() {
        return productId;
    }

    public void setProductId(BigInteger productId) {
        this.productId = productId;
    }
}
