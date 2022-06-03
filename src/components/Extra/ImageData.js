import React from "react";
import styled from "styled-components";
import axios from "axios";
import LikeComp from "./LikeComp";
import MyLikeComp from "./MyLikeComp";

const ImageData = ({ props, img, name, like }) => {
	const [myUser, setMyUser] = React.useState({});

	const getUser = async () => {
		const localURL = `http://localhost:2000/api/user/${props.user}`;

		await axios.get(localURL).then((res) => {
			setMyUser(res.data.data);
		});
	};

	React.useEffect(() => {
		getUser();
	}, []);

	return (
		<Container>
			{img ? <Image src={myUser?.avatar} /> : null}

			<Holder>
				{name ? <Text> Posted by: {myUser?.userName}</Text> : null}
				{like ? <MyLikeComp props={props} /> : null}
			</Holder>
		</Container>
	);
};

export default ImageData;

const Holder = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-left: 10px;
`;

const Text = styled.div`
	font-weight: 500;
	bottom: 0;
	z-index: 1;
	color: black;
`;
const Image = styled.img`
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 50%;
	background-color: white;
	border: 1px solid orange;
	position: absolute;
	top: -15px;
	left: -5px;
`;
const Container = styled.div`
	/* position: absolute; */
	/* right: 20px; */
	/* top: -10px; */
`;
