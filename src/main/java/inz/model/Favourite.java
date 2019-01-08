package inz.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "favourite")
public class Favourite implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "favouriteid")
    private Integer favouriteId;

    @Column(name = "userid", nullable = false)
    private Integer userId;

    @Column(name = "name")
    private String name;

    public Favourite() {}

    public Favourite(Integer favouriteId, Integer userId, String name) {
        this.favouriteId = favouriteId;
        this.userId = userId;
        this.name = name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
