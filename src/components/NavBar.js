import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { ClearAuthState } from '../store/action/auth.action';
import { stateBasket } from '../store/action/basket.action';
import Basket from './Basket';

function NavBar() {
	// const isAuth = AuthService.isAuthenticated();
	// const user = AuthService.Name();
	const navigate = useNavigate();

	// bu kısımda ise store içerisinde state bağlandık. bunu yapmak için ise useSelector denilen bir hook kullandık. storedan bilgi çekmek için useSelector hook kullanıyoruz.
	const authState = useSelector((store) => store.authState);
	const totalPrice = useSelector((store) => store.cartState.total);

	const dispatch = useDispatch();

	// console.log('isAuth', isAuth);

	const logout = () => {
		AuthService.logout((url) => {
			dispatch(ClearAuthState());
			navigate(url);
		});
	};

	const handleShow = () => {
		console.log('TIKLANDI');
		dispatch(stateBasket(true));
	};

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Link className="nav-item nav-link" to="/">
					<Navbar.Brand>Anasayfa</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-item nav-link" to="/">
							Anasayfa
						</Link>
						<Link className="nav-item nav-link" to="/about">
							About
						</Link>

						<NavDropdown title="Api" id="collasible-nav-dropdown">
							<NavDropdown.Item>
								<Link className="nav-item nav-link text-dark" to="/users">
									Users
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link className="nav-item nav-link text-dark" to="/comments">
									Comments
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link className="nav-item nav-link text-dark" to="/posts">
									Posts
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link className="nav-item nav-link text-dark" to="/products">
									Products
								</Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						{authState.isAuthenticated && (
							<>
								<Link className="nav-item nav-link" to="/profile">
									{authState?.username}
								</Link>
								<a className="nav-item nav-link" onClick={() => logout()}>
									Oturumu Kapat
								</a>

								<Button
									className="nav-item nav-link"
									onClick={() => handleShow()}
								>
									<i className="bi bi-cart2"></i>
									{totalPrice.toFixed(2)}
								</Button>
								<Basket></Basket>
							</>
						)}
						{!authState.isAuthenticated && (
							<Link className="nav-item nav-link" to="/login">
								Oturum Aç
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
