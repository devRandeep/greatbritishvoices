import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function Error() {
  return (
    <>
      <section className="error">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "50vh" }}
        >
          <Row className="text-center">
            <h1>404 </h1>
            <p className="mb-3">Sorry. Page not found.</p>
            <Link to="/" className="btnSite">
              Home
            </Link>
          </Row>
        </Container>
      </section>
    </>
  );
}
