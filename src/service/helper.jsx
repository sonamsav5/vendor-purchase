export const getUserType = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user == undefined) {
      return "NA";
    }
    return user.UserType;
  };
  
 
  