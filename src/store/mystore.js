// store golabl state tutan mekanizma
// reducer ise storedaki state güncelleyen mekanizma
// action state güncelleme işlemin başlatan mekanizma

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducer/auth.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductReducer } from './reducer/product.reducer';
import { CartReducer } from './reducer/cart.reducer';
import { BasketReducer } from './reducer/basket.reducer';
// store'a reducer bağlamış olduk

//combineReducers function ile sistemdeki tüm reducerları store tanıtmış oluruz.

export const myStore = createStore(
	combineReducers({
		authState: AuthReducer, // reducer alias authState
		productState: ProductReducer,
		cartState: CartReducer,
		basketState: BasketReducer,
	}),
	composeWithDevTools(applyMiddleware(thunk))
);

// applyMiddleware ile redux thunk api işlemleri için araya ekliyoruz.
// api den veri çekerek store güncelleme gibi bir işleminiz yoksa thunk ihtiyacınız yok.

// createStore daki ilk parametre {} sistemdeki reducerlar, ikinci parametre ise ara yazılım middleware demek. (Biz middleware olarak redux-thunk) middleware kullanacağız.

// React Devtools sadece React local State takibi ve React componentlerin takibi için kullanılır.

// Global State için ise, Redux Dev Tools ile Redux state action reducer takibi yapabildiğimiz bir extension'dır.

// 1. npm install -save-dev redux-devtools-extension
// myStore.js dosyasına gelip
// 2. import { composeWithDevTools } from 'redux-devtools-extension';
// 3. composeWithDevTools(applyMiddleware(thunk)) kodu ile middleware devTools ile sarmalamak
