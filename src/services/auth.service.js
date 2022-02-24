import { BaseHttpClientService } from './base-service';
import { TokenService } from './token.service';

export const AuthService = {};

AuthService.login = async ({ username, password, rememberme }, callback) => {
	const param = {
		username,
		password,
		grantType: 'password',
	};

	console.log('rememberme', rememberme);
	console.log('param', param);

	try {
		let response = await BaseHttpClientService.post(
			'https://localhost:5001/api/tokens',
			param
		);

		// token kalıcı yada kalıcı olmayacak şekilde tutulur.
		TokenService.setToken(response.accessToken, rememberme);
		callback('/', null);
	} catch (error) {
		callback(null, 'Kullanıcı adı veya parola hatalı');
	}
};

AuthService.logout = (callback) => {
	TokenService.clearToken();
	callback('/login');
};

AuthService.isAuthenticated = () => {
	return TokenService.getUserName() == null ? false : true;
};

AuthService.Name = () => {
	return TokenService.getUserName();
};
