package inz.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "favourite")
public class Favourite implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "favouriteid")
    private BigInteger favouriteId;

    @Column(name = "userid")
    private BigInteger userId;

    public Favourite() {}

    public Favourite(BigInteger favouriteId, BigInteger userId) {
        this.favouriteId = favouriteId;
        this.userId = userId;
    }

    public BigInteger getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(BigInteger favouriteId) {
        this.favouriteId = favouriteId;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }
}
