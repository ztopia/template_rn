import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/app_navigator'

/**
 * 自定义log中间件
 * https://cn.redux.js.org/docs/advanced/Middleware.html
 * @param store
 */
const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching ', action);
    }
    const result = next(action);
    console.log('nextState ', store.getState());
    return result;
};

const middlewares = [//中间件
    middleware,
    thunk,
    logger
];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));