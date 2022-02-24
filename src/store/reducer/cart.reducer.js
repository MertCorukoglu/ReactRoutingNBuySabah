import { CartService } from '../../services/cart.service';

const CartState = {
	cartItems: [],
	total: 0,
};

export const CartReducer = (state = CartState, action) => {
	console.log('action', action);

	switch (action.type) {
		case 'AddToCart':
			console.log('add');
			const cartObject1 = CartService.AddToCart(
				action.payload,
				state.cartItems
			);

			return {
				...state,
				cartItems: cartObject1.cartItems,
				total: cartObject1.total,
			};
		case 'RemoveFromCart':
			console.log('remove');
			const cartObject2 = CartService.RemoveFromCart(
				action.payload.id,
				state.cartItems
			);

			console.log('RemoveFromCart', cartObject2);

			return {
				...state,
				cartItems: cartObject2.cartItems,
				total: cartObject2.total,
			};
		case 'ClearFromCart':
			console.log('HEPSİNİ TEMİZLE');
			return {
				cartItems: [],
				total: 0,
			};
		default:
			console.log('default');
			return state;
	}
};
