var UserProfile = (function () {
  var full_name = "";
  var user_Id = 0;
  var isLogIn = false;

  var getName = function () {
    return full_name; // Or pull this from cookie/localStorage
  };

  var setName = function (name) {
    full_name = name;
    // Also set this in cookie/localStorage
  };
  var getUser_Id = function () {
    return user_Id; // Or pull this from cookie/localStorage
  };

  var setUser_Id = function (input) {
    user_Id = input;
    // Also set this in cookie/localStorage
  };
  var getIsLogin = function () {
    return isLogIn; // Or pull this from cookie/localStorage
  };

  var setIsLogIn = function (input) {
    isLogIn = input;
    // Also set this in cookie/localStorage
  };

  return {
    getName,
    setName,
    getUser_Id,
    setUser_Id,
    getIsLogin,
    setIsLogIn,
  };
})();

export default UserProfile;
