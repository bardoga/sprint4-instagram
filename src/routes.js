import { WelcomePage } from "./pages/welcome-page";
import { InstaApp } from "./pages/insta-app";



const routes = [

    {
        path: '/',
        component: < WelcomePage />,
        label: 'welcome'
    },
    {
        path: '/gram',
        component: < InstaApp />,
        label: 'Home'
    }
]

export default routes