import React from "react";
import Header from "./components/Header/Header";
import MainAuthScreen from "./components/AuthScreen/MainAuthScreen";
import SignIn from "./components/AuthScreen/SignIn";
import CreateProduct from "./components/Extra/CreateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/Extra/HomeScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import DatailPage from "./components/Extra/DatailPage";
import CartPage from "./components/Extra/Cart";
import Payment from "./components/Extra/Payment";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/detail/:id" element={<DatailPage />} />
					<Route path="/auth" element={<MainAuthScreen />} />
					<Route path="/createProduct" element={<CreateProduct />} />
					<Route path="/auth/signin" element={<SignIn />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
