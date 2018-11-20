package inz.repository;

import inz.model.User;

public interface UserRepositoryCustom {

    User getUserByLogin(String login);
    boolean userExistByLogin(String login);
    void updateUserPassword(String newPass, Integer id);
    void updateUserMail(String newMail, Integer id);
}
