export const loginCheckMiddleware = ({ to, from, store }) => {
  if ("islogin") {
    return true;
  } else {
    return { name: "Login" };
  }
};
