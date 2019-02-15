import Types from '../types';
import DataStore from '../../expand/dao/data_store';

export function onLoadPopularData(storeName,url){
    return dispatch=>{
        dispatch({type:Types.POPULAR_REFRESH ,storeNAme:storeName});//异步action redux-thunk
        let dataStore=new DataStore();
        dataStore.fetchData(url)//异步action与数据流
                 .then(data=>{
                    handleData(dispatch,storeNAme,data)
                 })
                 .catch(error=>{
                     console.log(error);
                     dispatch({
                         type:Types.LOAD_POPULAR_FAIL,
                         storeNAme,
                         error  
                     });
                 })
    }
}

function handleData(dispatch,storeName,data){
    dispatch({
        type:Types.LOAD_POPULAR_SUCCESS,
        item:data && data.data && data.data.items,
        storeName,
    })
}