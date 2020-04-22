import React, {createContext} from 'react';

export const ThemeContext = createContext('green');


export const UserContext = createContext({
	user: {},
	up: () => {},
	loggedIn: false
});
