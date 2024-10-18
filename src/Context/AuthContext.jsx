import {  createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

 export const authContext =createContext(false)
 
 
function AuthContextProvider ({children}) {
    const [islogin, setLogin]=useState(false);
    
    useEffect(()=>{
        try{
            jwtDecode(localStorage.getItem("token"))
            setLogin(true)
        }
        catch(error)
        {
          setLogin(false)
        localStorage.removeItem("token");
          
        }
    window.addEventListener("storage",()=>{
        
        try{
            jwtDecode(localStorage.getItem("token"))
            setLogin(true)
            
        }
        catch(error)
        {
          setLogin(false)
        localStorage.removeItem("token");
          
        }

    })
    },[])
      
    
    return ( 
        <authContext.Provider value={{islogin, setLogin}}>
          {children}
        </authContext.Provider>
     );
}

export default AuthContextProvider ;