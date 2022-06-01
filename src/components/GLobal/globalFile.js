import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	newProduct: [],
	product: [],
	cart: [],
};

const globalFile = createSlice({
	initialState,
	name: "anything",
	reducers: {
		createUser: (state, { payload }) => {
			state.user = payload;
		},
		signOut: (state) => {
			state.user = null;
		},

		addProduct: (state, { payload }) => {
			state.newProduct = payload;
		},

		addProducts: (state, { payload }) => {
			state.product = payload;
		},

		addToCart: (state, { payload }) => {
			const check = state.cart.findIndex((el) => el._id === payload._id);

			if (check >= 0) {
				state.cart[check].QTY += 1;
			} else {
				state.cart.push({ ...payload, QTY: 1 });
			}
		},

		removeItem: (state, { payload }) => {
			state.cart = state.cart.filter((el) => el._id !== payload._id);
		},

		changeItem: (state, { payload }) => {
			const check = state.cart.findIndex((el) => el._id === payload._id);
			const checkValue = state.cart[check].QTY;

			if (state.cart[check].QTY > 1) {
				state.cart[check].QTY -= 1;
			} else if (state.cart[check].QTY === 1) {
				// state.cart = state.cart.filter((el) => el._id !== payload._id);
				return;
			}
		},

		getTotal: (state, { payload }) => {
			const { totalPrice, totalQTY } = state.cart.reduce(
				(cost, items) => {
					const { QTY, price } = items;
					const mainPrice = QTY * price;

					cost.totalQTY += QTY;
					cost.totalPrice += mainPrice;

					return cost;
				},
				{
					totalPrice: 0,
					totalQTY: 0,
				}
			);
			state.getTotalPrice = totalPrice;
			state.getTotalQTY = totalQTY;
		},
	},
});

export const {
	createUser,
	signOut,
	addProduct,
	addProducts,
	addToCart,
	removeItem,
	changeItem,
	getTotal,
} = globalFile.actions;

export default globalFile.reducer;
