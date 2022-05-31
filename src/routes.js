import { LoginPage } from "./pages/login-page";
import { InstaApp } from "./pages/insta-app";
import { SignUp } from "./cmps/signup";
import home from './assets/svg/home11.png'


// console.log(home)
const routes = [

    // {
    //     path: '/',
    //     component: < LoginPage />,
    //     label: 'login'
    // },
    {
        path: '/gram',
        component: < InstaApp />,
        label: <img className="navbar-icons" src={home} alt="" width={24} height={24}/>
    },
    // {
    //     path: '/signup',
    //     component: <SignUp />,
    //     label: 'signup'
    // }

]

export default routes