import { firstNames, lastNames } from '../../constants/index'


export const getAlias = () =>{
    const alias = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
    return alias
}