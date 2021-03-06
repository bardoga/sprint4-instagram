import React from 'react';
// import { WelcomePage } from './pages/welcome-page';
import { Routes, Route, useParams } from 'react-router-dom';
import routes from './routes';
import { useNavigate, useLocation } from 'react-router-dom';


import { AppHeader } from './cmps/app-header';
import { SignUp } from './cmps/signup';
// import { SignUp } from './cmps/signup2';

import { StoryDetails } from './cmps/story-details.jsx'
import { LoginPage } from './pages/login-page';
import { UserProfile } from './pages/user-profile.jsx'


export function RootCmp() {
  const location = useLocation();
  // console.log(location)
  return (
    <div>
      {(location.pathname !== '/signup' && location.pathname !== '/') && <AppHeader />}
      {/* {if (routes.path === '/gram') return <AppHeader />} */}
      {/* <AppHeader /> */}
      <main>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/:id' element={<UserProfile />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/gram/:id' element={<StoryDetails />}></Route>
        </Routes>
      </main>
    </div>
  );
}

// function displayHeader() {
//   console.log(...routes)
//   if (routes === '/gram') return <AppHeader />
//   else return ''
// }