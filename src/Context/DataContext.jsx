/* eslint-disable react/prop-types */

import { createContext, useState } from "react"

export const ApiContext = createContext(null)


export const DataContext = ({children}) => {
    const [globalData, setGlobalData] = useState([])

    const [typo, setTypo]= useState('')

    console.log("my God: ",globalData)
  return (
    <ApiContext.Provider value={{globalData, setGlobalData, typo, setTypo}}>
      {children}
    </ApiContext.Provider>
  )
}

