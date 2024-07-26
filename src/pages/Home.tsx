import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const Home = () => {
	const navigate = useNavigate();
	const [authUser, setAuthUser] = useState({ name: '', email: '' });

	useEffect(() => {
		const authUserString = localStorage.getItem('auth');
		if (authUserString !== null) {
			setAuthUser(JSON.parse(authUserString));
		} else {
			navigate('/sign-in');
		}
	}, []);

	const logout = () => {
		signOut(auth).then(() => {
			navigate('/sign-in');
			localStorage.clear();
		});
	};

	return (
		<div>
			<h1>Profile Info</h1>
			<h2>email: {authUser.email}</h2>
			<h2>name: {authUser.name}</h2>
			<button onClick={logout}>Log Out</button>
		</div>
	);
};
