import React from "react";
import styled from "styled-components";
import axios from "axios";

const ImageData = ({ props, img, name }) => {
	const [myUser, setMyUser] = React.useState({});
	console.log(props);

	const getUser = async () => {
		const localURL = `http://localhost:2000/api/user/${props.user}`;

		await axios.get(localURL).then((res) => {
			setMyUser(res.data.data);
		});
	};
	console.log("Getting Data: ", myUser);

	React.useEffect(() => {
		getUser();
	}, []);

	return (
		<Container>
			{img ? <Image src={myUser?.avatar} /> : null}
			{name ? <Text> Posted by: {myUser?.userName}</Text> : null}
		</Container>
	);
};

export default ImageData;

const Text = styled.div`
	font-weight: 500;
	/* position: absolute; */
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
`;
const Container = styled.div`
	/* position: absolute; */
	/* right: 20px; */
	/* top: -10px; */
`;
