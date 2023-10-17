import {createContext, useState} from "react"


export const MenuExpandContext = createContext()

const toggleExpand = () =>{
    setExpanded(prevExpanded => !prevExpanded)
} 

export function MenuExpandContextProvider(props){
    const [expanded, setExpanded] = useState(true)

    return(
        <MenuExpandContext.Provider value={{expanded, setExpanded, toggleExpand}}>
            {props.children}
        </MenuExpandContext.Provider>
    )
}