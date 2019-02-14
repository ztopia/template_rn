import {applyMiddleware, createStore} from 'redux'
import reducers from '../reducer'
import {middleware} from '../navigator/app_navigator'


const middlewares = [//中间件
    middleware,
];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));