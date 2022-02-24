import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { stateBasket } from '../store/action/basket.action';

function Basket({ ...props }) {
	const basketState = useSelector((store) => store.basketState.status);
	console.log('basketState', basketState);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(stateBasket(false));
	};
	return (
		<>
			<Offcanvas show={basketState} {...props}>
				<Offcanvas.Header>
					<Offcanvas.Title>Offcanvas</Offcanvas.Title>
					<a
						onClick={() => {
							handleClose();
						}}
					>
						<i class="bi bi-x-circle"></i>
					</a>
				</Offcanvas.Header>
				<Offcanvas.Body>
					Some text as placeholder. In real life you can have the elements you
					have chosen. Like, text, images, lists, etc.
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
