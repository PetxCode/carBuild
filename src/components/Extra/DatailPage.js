import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DatailPage = ({ props }) => {
	const { id } = useParams();
	const product = useSelector((state) => state.product);
	console.log("getID", props);
	const getData = async () => {
		const url = `http://localhost:2000/api/item/629640f5b4f5cbb70d03d57a/${id}`;
	};
	React.useEffect(() => {
		getData();
	}, []);
	return (
		<Container>
			<Image />
			<Text>Hello</Text>
			<Div1>
				<div>price</div>
				<div>Qty</div>
			</Div1>
			<Div>
				<Diva
					bg="#004080"
					// onClick={() => {
					// 	setPage(page - 1);
					// }}
				>
					Remove Item
				</Diva>
				{/* {page} */}
				<Diva
					bg="red"
					// onClick={() => {
					// 	setPage(page + 1);
					// }}
				>
					Add Item
				</Diva>
			</Div>
		</Container>
	);
};

export default DatailPage;

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

const Div1 = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 10px;
	width: 600px;
`;

const Div = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 80px;
`;

const Image = styled.div`
	width: 600px;
	height: 500px;
	background-color: red;
	margin-bottom: 20px;
	border-radius: 10px;
`;
const Text = styled.div`
	font-weight: 500;
`;
const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
