import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    profile: {},
    isAuthenticated: false,
    userType: null,
    chooseUserType: (type) => { },
    authenticate: (token) => { },
    setProfile: (profile) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [profileData, setProfileData] = useState();
    const [userType, setUserType] = useState();

    function authenticate(token) {
        setAuthToken(token);
        console.log('setting');
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    function setProfile(profile) {
        setProfileData(profile);
    }

    function chooseUserType(type) {
        setUserType(type);
        console.log('user type set to ',type);
    }

    const value = {
        token: authToken,
        profile: profileData,
        isAuthenticated: !!authToken,
        userType: userType,
        chooseUserType: chooseUserType,
        authenticate: authenticate,
        setProfile: setProfile,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;