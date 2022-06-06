import { LoginPage } from "./pages/login-page";
import { InstaApp } from "./pages/insta-app";
import { SignUp } from "./cmps/signup";
import home from "./assets/svg/home11.png";
import { UserProfile } from "./pages/user-profile.jsx";

// console.log(home)
const routes = [
  //   {
  //     path: "/userid",
  //     component: <UserProfile />,
  //     label: "UserProfile",
  //   },
  {
    path: "/gram",
    component: <InstaApp />,
    label: (
      <img className="navbar-icons" src={home} alt="" width={24} height={24} />
    ),
  },
  //   {
  //     path: "/:user",
  //     component: <UserProfile />,
  //     label: "UserProfile",
  //   },
];

export default routes;
