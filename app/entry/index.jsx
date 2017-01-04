import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

//api载入
import * as routers from '../constants/routerConfig';

//组件载入
import Login from '../containers/login/index.jsx';

import App from '../containers/APP.jsx';
import Grade from '../containers/grade/index.jsx';


const GrabRouter = () =>
    <Router history={browserHistory}>
        <Route path={routers.LOGIN} component={Login} />
        <Route path={routers.INDEX} component={App}>
            <Route path={routers.GRADE} component={Grade} />
        </Route>
    </Router>


export default GrabRouter;