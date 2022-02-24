export const BasketState = {
	status: false,
};

export const BasketReducer = (state = BasketState, action) => {
	switch (action.type) {
		case 'stateBasket':
			return {
				...state,
				status: action.payload,
			};
		default:
			return state;
	}
};
