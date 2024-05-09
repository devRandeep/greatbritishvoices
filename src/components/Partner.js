import React from 'react';
import { Col, Container, Row } from "react-bootstrap";

export default function Partner() {
	const GBLogo = [

		{
			imgUrl: "https://greatbritish.b-cdn.net/wp-content/uploads/2021/03/GBS-LOGO-1.png",
			imgLink: "",
		},
		{
			imgUrl: "https://greatbritish.b-cdn.net/wp-content/uploads/2021/03/GBP-LOGO-1.png",
			imgLink: "",
		},
		
	]
	return (
		<>
			<section className="logoSection">
				<Container>
					<Row className='justify-content-center'>
						{GBLogo.map((itemloop, index) => (
							<Col md={4}>
								<a href={itemloop.imgLink}>
									<img src={itemloop.imgUrl} alt="" />
								</a>
							</Col>
						))}
					</Row>
				</Container>
			</section>
		</>
	);
}
