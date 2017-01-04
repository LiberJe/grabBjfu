import React from 'react';
import ReactDOM from 'react-dom';

// redux
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore.js';

import GrabRouter from './entry/index.jsx';

ReactDOM.render(
    // <Provider store={configureStore}>
        <GrabRouter /> ,
    // </Provider>,
    document.getElementById("content")
)

