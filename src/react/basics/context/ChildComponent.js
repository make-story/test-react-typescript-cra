import React, { useContext } from 'react';
import AuthContext from './AuthContext';
function ChildComponent() {
    const auth = useContext(AuthContext);
    console.log(auth); // { userId: 'ysm', loggedIn: true }
    return null;
}
export default ChildComponent;