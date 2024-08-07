import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "react-bootstrap/Pagination";
import { Helmet } from "react-helmet";
import SeoApi from "./SeoApi";

export default function BlogList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("https://www.greatbritishvoices.co.uk/wp-json/custom/v1/blog/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="please_wait">
        {" "}
        <div className="loader"> </div>
        <span>Data Loading....</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // Search Blog;
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const filteredData = data.filter((item) =>
    item.post_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Helmet>
        <title>Blogs | Great British UK Talent</title>
      </Helmet>
      <SeoApi apiUrl="https://greatbritishvoices.co.uk/wp-json/rankmath/v1/getHead?url=https://greatbritishvoices.co.uk/blog/" />

      <section className="newsArticle sectionpadding">
        <Row>
          <div className="inputGroup">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </Row>
        <Row className="mt-4 row-cols-5 row-gap-4">
          {currentItems.map((item, index) => (
            <Col key={index}>
              <div className="articleBox">
                <div className="articleImage">
                  <img src={item.post_thumbnail} alt={item.post_title} />
                </div>
                <div className="articleDesc">
                  <span>{item.post_date}</span>
                  <Link to={`/post/${item.ID}`}>
                    <h5
                      dangerouslySetInnerHTML={{ __html: item.post_title }}
                    ></h5>
                  </Link>
                  {/* <p
                    dangerouslySetInnerHTML={{ __html: item.post_content }}
                  ></p> */}
                  <Link to={`/post/${item.ID}`} className="button">
                    Read More
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Row>
      </section>
    </>
  );
}
