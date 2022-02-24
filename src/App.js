import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';

import Layout from './components/Layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CheckAuthState } from './store/action/auth.action';
import { FetchProducts, FetchProducts2 } from './store/action/product.action';
// Outlet c# daki renderbody denk gelir. eğer sayfalar arası geçiş olacak ise bunu koymak zorundayız

function App() {
	const dispatch = useDispatch();

	// Not: State deki bilgi tarayıcıyı kapattığımız anda gider, oturum gibi durumları state üzerinden kontrol ediyorsak. kesinlikle state'imizi uygulamaya ilk girdiğimizde aşağıdaki gibi güncellemeliyiz. Kullanıcı bilgileri çünkü localStorage veya sessionStorage tutulur. State sadece uygulama geliştirme aşamasına değerlere ulaşmak için bir kolaylık sağlar.

	useEffect(() => {
		dispatch(CheckAuthState());
		dispatch(FetchProducts());

		// uygulama ilk yüklendiğinde store productsları yükle

		console.log('app.js useEffect');

		// 1 saat da bir productların güncel halini çekelim
		// setInterval(() => {
		// 	console.log('interval');
		// 	dispatch(FetchProducts());
		// }, 1000 * 60 * 60);
	}, []);

	return (
		<div className="App">
			<Layout />
		</div>
	);
}

export default App;
