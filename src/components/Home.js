import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Whatwedo from "./Whatwedo";
import Brand from "./Brand";
import Partner from "./Partner";
import Team from "./Team";
import Hero from "./Hero";
import Wesupply from "./Wesupply";
import { Helmet } from "react-helmet";
import Celebrity from "./Celebrity";
import Result from "./Result";
import VoiceCards from "./VoiceCards";
import Blog from "./Blog";
import Ourprocess from "./Ourprocess";


function Home() {

	return (
		<>
			<Helmet>
				<title>Home | Great British Voices </title>
			</Helmet>
			{/* First Fold  ====== Section First */}

			<Hero />

			{/* Logo Section ============== Section Second */}

			<Partner />

			{/* What We Do ============ Third Section */}

			<Whatwedo />

			{/* ===================== BRAND LOGO */}

			{/* <Brand /> */}

			{/* ====================== We Supply */}

			<Wesupply />

			{/* ================= Featured Voices */}

			<section className="featuredVoices sectionpadding">
				<Row>
					<div className="heading_panel">
						<h3>Featured Voices</h3>
						<div className="slider_control">
							<Link to="/voicecards" className="button">View More</Link>
						</div>
					</div>
				</Row>
				<Row className="pt-3">
					<VoiceCards />
				</Row>
			</section>

			{/* ============== News Article */}

			<Blog />

			{/* ============== Celebrity Voices */}
			<Celebrity />

			{/* ================= Our Process */}
			<Ourprocess />
			{/* ======================= Our Team */}
			<Team />

		</>
	);
};

export default Home;