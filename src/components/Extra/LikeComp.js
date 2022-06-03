import React from "react";
import styled from "styled-components";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";

const LikeComp = ({ props }) => {
	const user = useSelector((state) => state.persistedReducer.user);

	const addLike = async () => {
		const localURL = "http://localhost:2000";
		const url = `${localURL}/api/like/${user._id}/${props._id}`;

		await axios.post(url, { _id: user._id });
		window.location.reload();
	};

	const deleteLike = async () => {
		const localURL = "http://localhost:2000";
		const url = `${localURL}/api/like/${user._id}/${props._id}/${user._id}`;

		await axios.post(url, { _id: user._id });
		window.location.reload();
	};

	return (
		<Container>
			<Total>
				Total Likes: <span>{props?.like.length}</span>
			</Total>
			{props?.like.includes(user._id) ? (
				<Like
					onClick={() => {
						deleteLike();
					}}
				/>
			) : (
				<Unlike onClick={addLike} />
			)}
		</Container>
	);
};

export default LikeComp;
const Total = styled.div`
	color: black;
	font-size: 12px;
	span {
		font-weight: 900;
	}
`;
const Like = styled(MdFavorite)`
	transition: all 350ms;
	:hover {
		transform: scale(1.3);
		cursor: pointer;
	}
`;

const Unlike = styled(MdFavoriteBorder)`
	transition: all 350ms;
	:hover {
		transform: scale(1.3);
		cursor: pointer;
	}
`;

const Container = styled.div`
	margin-right: 10px;
	color: red;
	flex-direction: column;
	display: flex;
	align-items: center;
`;
