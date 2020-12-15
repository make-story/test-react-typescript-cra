import React from 'react';
import ChildComponent from './ChildComponent';
import { AuthProvider } from './AuthContext';
function ParentComponent() {
    const auth = { userId: 'ysm', loggedIn: true };
    return (
        <AuthProvider value={auth}>
            <ChildComponent />
        </AuthProvider>
    );
}