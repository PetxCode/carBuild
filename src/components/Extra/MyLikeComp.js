import React from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const MyLikeComp = ({ props }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.persistedReducer.user);
	const id = user._id;
	// console.log(id);
	// console.log("The Props: ", props);

	const addLikes = async (likeID) => {
		const mainURL = "http://localhost:2000";
		const url = `${mainURL}/api/item/${id}/${likeID}/like`;

		await axios.post(url);
		// window.location.reload();
	};

	const deleteLikes = async (likeID) => {
		const mainURL = "http://localhost:2000";
		const url = `${mainURL}/api/item/${id}/${likeID}/${id}`;

		await axios.delete(url);
		// window.location.reload();
	};

	return (
		<Container>
			<Total>
				Likes: <span>{props.like.length}</span>
			</Total>
			<Holder>
				{props.like.includes(id) ? (
					<Like
						onClick={() => {
							deleteLikes(props._id);
							console.log("You don like am", props._id);
						}}
					/>
				) : (
					<Unlike
						onClick={() => {
							addLikes(props._id);
							console.log("You never like am", props._id);
						}}
					/>
				)}
			</Holder>
		</Container>
	);
};

export default MyLikeComp;

const Holder = styled.div``;
const Total = styled.div`
	text-transform: uppercase;
	color: black;
	font-size: 12px;

	span {
		font-weight: 900;
	}
`;

const Unlike = styled(AiOutlineHeart)`
	transition: all 350ms;

	:hover {
		cursor: pointer;
		transform: scale(1.2);
	}
`;

const Like = styled(AiFillHeart)`
	transition: all 350ms;

	:hover {
		cursor: pointer;
		transform: scale(1.2);
	}
`;

const Container = styled.div`
	color: red;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
