import React from 'react';
// import { WelcomePage } from './pages/welcome-page';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import { AppHeader } from './cmps/app-header';

import {StoryDetails} from './cmps/story-details.jsx'


export function RootCmp() {
  return (
    <div>
      {/* {(routes.path === 'gram') && <AppHeader />} */}
      <AppHeader/>
      <main>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
          <Route path='/gram/:id' element={<StoryDetails/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

