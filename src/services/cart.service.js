// cart ekleme çıkarama güncelleme adet artırma vs gibi işlemler için burada logicler yazılacak bize cart bilgisi döndürecek.

export const CartService = {
	AddToCart: (newCartItem, stateCartItems) => {
		const existingCartItem = stateCartItems.find((x) => x.id == newCartItem.id);

		// daha önceden sepete eklenmiş
		if (existingCartItem != undefined) {
			existingCartItem.quantity += 1;

			let _total = 0;

			stateCartItems.forEach((cartItem) => {
				_total += Number(cartItem.price) * Number(cartItem.quantity);
			});

			return {
				cartItems: [...stateCartItems],
				total: _total,
			};
		} else {
			let newCartItems = [newCartItem, ...stateCartItems];

			console.log('newCartItems', newCartItems);

			let _total = 0;

			newCartItems.forEach((cartItem) => {
				_total += Number(cartItem.price) * Number(cartItem.quantity);
			});

			return {
				cartItems: [...newCartItems],
				total: _total,
			};
		}
	},
	RemoveFromCart: (id, stateCartItems) => {
		const newCartItems = stateCartItems.filter((x) => x.id != id);

		let _total = 0;

		newCartItems.forEach((item) => {
			_total += Number(item.quantity) * Number(item.price);
		});

		console.log('newCartItems', newCartItems);

		return {
			cartItems: [...newCartItems],
			total: _total,
		};
	},
	ReduceFromCart: (id, stateCartItems) => {
		const newCartItems = stateCartItems.find((x) => x.id == id);

		let _total = 0;
		if (newCartItems.quantity == 1) {
			const newCartItems1 = stateCartItems.filter((x) => x.id != id);
			newCartItems1.forEach((item) => {
				_total += Number(item.quantity) * Number(item.price);
			});
			return {
				cartItems: [...newCartItems1],
				total: _total,
			};

		}else{

			stateCartItems.find((x) => x.id == id).quantity -= 1;
			stateCartItems.forEach((item) => {
				_total += Number(item.quantity) * Number(item.price);
			});
			return {
				cartItems: [...stateCartItems],
				total: _total,
			};
			


		}

	},
};
