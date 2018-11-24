package inz.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Table(name = "shop")
public class Shop implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "shopid")
    private Integer shopId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "localization")
    private String localization;

    @Column(name = "street")
    private String street;

    @Column(name = "number")
    private String number;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "telnumber")
    private String telnumber;

    @Column(name = "site")
    private String site;

    public Shop(){}

    public Shop(String name, String localization, String street, String number, String country, String city,  String telnumber, String site) {
        this.name = name;
        this.localization = localization;
        this.street = street;
        this.number = number;
        this.country = country;
        this.city = city;
        this.telnumber = telnumber;
        this.site = site;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocalization() {
        return localization;
    }

    public void setLocalization(String localization) {
        this.localization = localization;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTelnumber() {
        return telnumber;
    }

    public void setTelnumber(String telnumber) {
        this.telnumber = telnumber;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
