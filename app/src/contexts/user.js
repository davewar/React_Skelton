import React, { createContext, useEffect, useState } from 'react';
import { baseUrl } from '../constants/roles';

// export const UserContext = createContext<UserContextType | null>(null);
export const UserContext = createContext({});

const UserProvider = ({ children }) => {
	const [user, setUser] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [isLogged, setIsLogged] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [isEditor, setIsEditor] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [role, setRole] = useState(null);

	const logUserOut = async () => {
		try {
			//remove cookie
			await fetch(`${baseUrl}/user/logout`);
			//remove local storage
			localStorage.removeItem('firstlogin');
			// reset state
			setUser('');
			setAccessToken('');
			setIsLogged(false);
			setIsUser(false);
			setIsEditor(false);
			setIsAdmin(false);
			setRole(null);
		} catch (err) {
			if (err instanceof Error) console.log(err);
		}
	};

	// finds out if logged user is admin or customer
	useEffect(() => {
		if (accessToken) {
			const getUser = async () => {
				try {
					const res = await fetch(`${baseUrl}/user/infor`, {
						headers: { Authorization: `Bearer ${accessToken}` },
					});

					const data = await res.json();

					if (data?.user) {
						setIsLogged(true);
						setUser(data.user.name);
						setRole(data.user.role);

						if (data.user.role === 0) setIsUser(true);
						if (data.user.role === 1) setIsEditor(true);
						if (data.user.role === 2) setIsAdmin(true);
					}
				} catch (err) {
					if (err instanceof Error) console.log('DW', err.message);
				}
			};

			getUser();
		}
	}, [accessToken]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isLogged,
				setIsLogged,
				isAdmin,
				setIsAdmin,
				accessToken,
				setAccessToken,
				role,
				setRole,
				isUser,
				setIsUser,
				setIsEditor,
				isEditor,
				logUserOut,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
