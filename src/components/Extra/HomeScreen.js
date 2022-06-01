import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { addProduct, addProducts, addToCart } from "../GLobal/globalFile";
import pix from "./babe.jpeg";
import { Link } from "react-router-dom";
import ImageData from "./ImageData";

const HomeSccreen = () => {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.persistedReducer.product);
	const user = useSelector((state) => state.persistedReducer.user);

	const [page, setPage] = useState(3);

	const getData = async () => {
		const localURL = "http://localhost:2000";
		const url = `${localURL}/api/item/all`;

		await axios.get(url).then((res) => {
			console.log(res.data.data);
			dispatch(addProducts(res.data.data));
		});
	};

	console.log("This is the Product: ", product);

	useEffect(() => {
		getData();
	}, []);

	return (
		<Container>
			<Wrapper>
				{product?.map((props) => (
					<Card key={props._id}>
						<Diiv>
							<ImageData props={props} img />
						</Diiv>
						<Link to={`/detail/${props._id}`}>
							<Image src={props.avatar ? props.avatar : pix} />
						</Link>
						<TextHolder>
							<Holder>
								<Title>{props.title}</Title>

								<Cart
									onClick={() => {
										dispatch(addToCart(props));
									}}
								>
									Add To Cart
								</Cart>
							</Holder>
							<Message>{props.price}</Message>
						</TextHolder>
						<ImageData props={props} name />
					</Card>
				))}
			</Wrapper>
			<Div>
				<Diva
					bg="#004080"
					onClick={() => {
						setPage(page - 1);
					}}
				>
					Prev
				</Diva>
				{page}
				<Diva
					bg="red"
					onClick={() => {
						setPage(page + 1);
					}}
				>
					Next
				</Diva>
			</Div>
		</Container>
	);
};

export default HomeSccreen;

const Diiv = styled.div`
	position: absolute;
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
	margin-top: 80px;
`;

const Cart = styled.div`
	color: white;
	padding: 10px;
	font-size: 15px;
	background-color: darkorange;
	transition: all 350ms;
	transform: scale(1);
	transform-origin: center;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
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
