import Types from '../../action/types';

const defaultState={}

export default function onAction(state=defaultState,action){
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]:{//action树
                    ...[action.storeName],
                    items:actions.items,
                    isLoading:false,
                },
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]:{//action树
                    ...[action.storeName],
                    isLoading:true,
                },
            };
        case Types.POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]:{//action树
                    ...[action.storeName],
                    isLoading:false,
                },
            };
        default:
            return state;
    }
}