import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";
import {
	addProducts,
	removeItem,
	changeItem,
	addToCart,
	getTotal,
} from "../GLobal/globalFile";
import pix from "./babe.jpeg";
import { Link } from "react-router-dom";

const CartPage = () => {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.persistedReducer.cart);
	const user = useSelector((state) => state.persistedReducer.user);
	const price = useSelector((state) => state.persistedReducer.getTotalPrice);
	const qty = useSelector((state) => state.persistedReducer.getTotalQTY);

	const [page, setPage] = useState(3);

	const getData = async () => {
		const localURL = "http://localhost:2000";
		const url = `${localURL}/api/item/all`;

		await axios.get(url).then((res) => {
			console.log(res.data.data);
			dispatch(addProducts(res.data.data));
		});
	};

	const config = {
		reference: new Date().getTime().toString(),
		email: user.email,
		amount: 50000,
		publicKey: "pk_live_2732df7378e84dbe0013bb9fd7f00faad438e244",
	};

	const onSuccess = (reference) => {
		console.log(reference);
	};

	const onClose = () => {
		console.log("closed");
	};

	const initializePayment = usePaystackPayment(config);

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		dispatch(getTotal());
	}, [product]);

	return (
		<Container>
			<Total>
				<Title>Total Cost: {price}</Title>
				<Title>Total QTY: {qty}</Title>
				<DivaMake
					bg="red"
					onClick={() => {
						initializePayment(onSuccess, onClose);
					}}
				>
					Make Payment
				</DivaMake>
			</Total>
			<Wrapper>
				{product?.map((props) => (
					<Card key={props._id}>
						<Link to={`/detail/${props._id}`}>
							<Image src={props.avatar ? props.avatar : pix} />
						</Link>
						<TextHolder>
							<Holder>
								<Title>{props.title}</Title>
								<Icon
									onClick={() => {
										dispatch(removeItem(props));
									}}
								/>
							</Holder>
							<br />
							<Holder>
								<Message>Cost: {props.price}</Message>
								<Message></Message>
								<Message> total Price: {props.price * props.QTY}</Message>
							</Holder>
							<br />
							<Div>
								<Diva
									bg="#004080"
									onClick={() => {
										dispatch(changeItem(props));
									}}
								>
									-
								</Diva>
								{props.QTY}
								<Diva
									bg="red"
									onClick={() => {
										dispatch(addToCart(props));
									}}
								>
									+
								</Diva>
							</Div>
						</TextHolder>
					</Card>
				))}
			</Wrapper>
		</Container>
	);
};

export default CartPage;

const Total = styled.div`
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const DivaMake = styled.div`
	padding: 15px 25px;
	width: 200px;
	color: white;
	background-color: ${({ bg }) => bg};
	margin: 0 10px;
	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.04);
	}
`;

const Diva = styled.div`
	padding: 15px 25px;
	color: white;
	background-color: ${({ bg }) => bg};
	margin: 0 10px;
	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.04);
	}
`;

const Div = styled.div`
	display: flex;
	justify-content: center;
	margin: 10px 0;
	align-items: center;
`;

const Icon = styled(AiTwotoneDelete)`
	color: red;
	font-size: 25px;
	transition: all 350ms;
	transform: scale(1);
	transform-origin: center;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;
const Holder = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Message = styled.div`
	color: gray;
`;

const Title = styled.div`
	text-transform: uppercase;
	font-weight: 500;
`;

const TextHolder = styled.div`
	padding: 5px 10px;
`;

const Image = styled.img`
	width: 100%;
	height: 200px;
	background-color: darkorange;
	object-fit: cover;
`;

const Card = styled.div`
	margin: 10px;
	width: 300px;
	min-height: 320px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 40px;
`;

const Container = styled.div`
	width: 100%;
	min-height: calc(100vh - 70px);
	height: 100%;
	padding-top: 70px;
`;
