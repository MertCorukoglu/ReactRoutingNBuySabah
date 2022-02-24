import React from 'react';
import { Offcanvas, Button, ListGroup, Row, Col, Badge } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { stateBasket } from '../store/action/basket.action';

function Basket({ ...props }) {
	const basketState = useSelector((store) => store.basketState.status);
	const cartItems = useSelector((store) => store.cartState.cartItems);
	console.log('basketState', basketState);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(stateBasket(false));
	};
	return (
		<>
			<Offcanvas show={basketState} {...props}>
				<Offcanvas.Header>
					<Offcanvas.Title>Sepetim</Offcanvas.Title>
					<a
						onClick={() => {
							handleClose();
						}}
					>
						<i class="bi bi-x-circle"></i>
					</a>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ListGroup as="ul">
						{cartItems &&
							cartItems.map((item) => {
								return (
									<ListGroup.Item as="li">
										<Row>
											<Col>
												<div>
													<b>{item.name}</b>
												</div>
												<div>{item.price}₺</div>
											</Col>
											<Col>
												<a>
													<i class="bi bi-dash-square"></i>
												</a>{' '}
												<Badge bg="dark" pill>
													{item.quantity}
												</Badge>
												<a>
													<i class="bi bi-plus-square"></i>
												</a>
												<a>
													<i class="bi bi-x-square"></i>
												</a>
											</Col>
										</Row>
									</ListGroup.Item>
								);
							})}
					</ListGroup>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

function Example() {
	return (
		<>
			{['end'].map((placement, idx) => (
				<Basket key={idx} placement={placement} name={placement} />
			))}
		</>
	);
}

export default Example;
