import React from "react";
import { usePaystackPayment } from "react-paystack";
import styled from "styled-components";

function Payment() {
	const config = {
		reference: new Date().getTime().toString(),
		email: "user@example.com",
		amount: 400000,
		publicKey: "pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18",
	};

	const onSuccess = (reference) => {
		console.log(reference);
	};

	const onClose = () => {
		console.log("closed");
	};

	const initializePayment = usePaystackPayment(config);
	return (
		<Div>
			<button
				onClick={() => {
					initializePayment(onSuccess, onClose);
				}}
			>
				Make Payment
			</button>
		</Div>
	);
}

export default Payment;

const Div = styled.div`
	padding-top: 400px;
`;
