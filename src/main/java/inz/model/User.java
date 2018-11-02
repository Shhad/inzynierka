package inz.model;


import javax.persistence.*;
import java.math.BigInteger;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger userdId;
    private String name;
    private String surname;
    private String login;
    private String password;
    private String mail;
    private boolean admin;

    public User(){}

    public User(String name, String surname, String login, String password, String mail, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.password = password;
        this.mail = mail;
        this.admin = admin;
    }

    public BigInteger getUserdId() {
        return userdId;
    }

    public void setUserdId(BigInteger userdId) {
        this.userdId = userdId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
