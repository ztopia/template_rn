import Types from '../types'

export function onThemeChange(theme){
    return {type:Types.THEME_CHANGE,theme:theme}//必须携带一个type的string类型
}