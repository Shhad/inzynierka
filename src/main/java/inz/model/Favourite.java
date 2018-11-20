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
    private Integer favouriteId;

    @Column(name = "userid")
    private Integer userId;

    public Favourite() {}

    public Favourite(Integer favouriteId, Integer userId) {
        this.favouriteId = favouriteId;
        this.userId = userId;
    }

    public Integer getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(Integer favouriteId) {
        this.favouriteId = favouriteId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
