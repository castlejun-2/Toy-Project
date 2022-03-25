import UserStorage from '../../models/User/UserStorage.js';

class Controller {
  process = {
    login: async (req, res) => {
      const { nickname, password } = req.body;
      const userInfo = { nickname: nickname, password: password };
      const User = new UserStorage(userInfo);
      const userLogin = await User.loginUser();
      return res.send(userLogin);
    },
    register: async (req, res) => {
      const { nickname, password } = req.body;
      const userInfo = { nickname: nickname, password: password };
      const User = new UserStorage(userInfo);
      const userRegister = await User.createUser();
      return res.send(userRegister);
    },
  };
}
export default new Controller();
