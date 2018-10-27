package inz.dao;

import inz.model.User;

import java.math.BigInteger;
import java.util.List;

public interface UserDao {

    User getUser(BigInteger id);
    BigInteger saveUser(User User);
    List<User> getUsers();
    void modifyUser(User User);
    void deleteUser(BigInteger id);
}
