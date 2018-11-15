package inz.repository;

import inz.model.User;

public interface UserRepositoryCustom {

    User getUserByLogin(String login);
}
