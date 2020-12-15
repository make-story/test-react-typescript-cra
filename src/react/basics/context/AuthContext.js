// https://medium.com/better-programming/10-tips-and-tricks-that-will-make-you-a-better-reactjs-dev-95f66cc18087
import React from 'react';
const AuthContext = React.createContext({});
export const AuthProvider = AuthContext.Provider;
export default AuthContext;