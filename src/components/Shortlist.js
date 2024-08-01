import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaRegStar } from "react-icons/fa6";
import { FaSoundcloud } from "react-icons/fa";
export default function Shortlist() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let favoriteArr = localStorage.getItem("favorite");
    if (favoriteArr && favoriteArr.length > 0) {
      favoriteArr = JSON.parse(favoriteArr);
      favoriteArr.forEach((element) => {
        fetch(
          `https://greatbritishvoices.co.uk/wp-json/custom/v1/news/${element.id}`
        )
          .then((res) => res.json())
          .then((json) => {
            setItems((pre) => [...pre, json]);
            setIsLoaded(true);
          });
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  const removeItem = (id) => {
    let filterArr = items.filter((pre) => pre.id !== id);
    localStorage.setItem("favorite", JSON.stringify(filterArr));
    setItems(filterArr);
  };

  if (!isLoaded)
    return (
      <div className="please_wait">
        {" "}
        <div className="loader"> </div>
        <span>Data Loading....</span>
      </div>
    );
  return (
    <>
      <div className="searchResult py-8 px-8">
        <Row className="row-gap-3">
          {items.map((post, index) => (
            <Col md={3} key={index}>
              <div className="voiceBox">
                <div className="profileImage">
                  <Link to={`/talent/${post.id}`}>
                    <img src={post.thumbnails} alt="" />
                  </Link>
                  <li
                    id="add__shortlist"
                    className="shortListed"
                    onClick={() => removeItem(post.id)}
                  >
                    <FaRegStar />
                  </li>
                </div>
                <div className="voiceCandidateDetails">
                  <Link to={`/talent/${post.id}`}>
                    <span className="">{post.title}</span>
                  </Link>
                  <ul>
                    <li
                      dangerouslySetInnerHTML={{ __html: post.key_information }}
                    ></li>
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
