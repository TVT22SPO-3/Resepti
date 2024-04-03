import React, { useState, useEffect } from 'react'
import { AuthContext } from './CreateAuthContext'
import { auth, onAuthStateChanged } from '../firebase/config';
import { Auth } from 'firebase/auth';


export default function AuthProvider({children}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null)


console.log("AuthProvider1", user)


    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
    
    useEffect(() => {
      const subscriber = onAuthStateChanged(auth, (user) => {
        console.log('AuthProvider2', user)
        setUser(user)
        return subscriber
      })

    }, [])


    if (initializing) return null;
    console.log("AuthProvider3",user)


      return (
        <AuthContext.Provider value={ {user , setUser} }>
          {children}
        </AuthContext.Provider>
      )
    }
    
  