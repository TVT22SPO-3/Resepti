import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './CreateAuthContext'

export const useAuth = () => {
    return useContext(AuthContext)
}