import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaRegStar } from "react-icons/fa6";
import { FaSoundcloud } from "react-icons/fa";

export default function FeaturedVoices() {
  const [items, setItems] = useState([]);
  const [posts, setNews_posts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorite");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [showAudio, setShowAudio] = useState({});

  useEffect(() => {
    fetch(`https://greatbritishvoices.co.uk/wp-json/custom/v1/talents`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.acf_fields);
        setNews_posts((prevPosts) => [...prevPosts, ...json.posts]);
        setIsLoaded(true);
        setIsLoadingMore(false);
        setTotalPages(json.total_pages); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoaded(true);
        setIsLoadingMore(false);
      });
  }, [currentPage]);

  if (!isLoaded)
    return (
      <div className="please_wait">
        <div className="loader"></div>
        <span>Data Loading....</span>
      </div>
    );

  const handleShortlist = (id) => {
    setFavorites((prevItems) => {
      const isFavorite = prevItems.some((favorite) => favorite.id === id);
      let updatedFavorites;
      if (!isFavorite) {
        updatedFavorites = [...prevItems, { id }];
      } else {
        updatedFavorites = prevItems.filter((favorite) => favorite.id !== id);
      }
      localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const toggleAudio = (id) => {
    setShowAudio((prevShowAudio) => ({
      ...prevShowAudio,
      [id]: !prevShowAudio[id],
    }));
  };

  return (
    <>
      <Helmet>
        <title>Featured Voices | Great British Voices</title>
      </Helmet>
      <div className="searchResult py-8 px-8">
        <Row className="row-gap-3">
          {posts.slice(0, 4).map((post, index) => (
            <Col md={3} key={index}>
              <div className="voiceBox">
                <div
                  className="profileImage"
                  style={{ display: showAudio[post.id] ? "none" : "block" }}
                >
                  <Link to={`/talent/${post.id}`}>
                    <img src={post.thumbnails} alt="" />
                  </Link>
                  <li
                    id="add__shortlist"
                    className={
                      favorites.some((favorite) => favorite.id === post.id)
                        ? "shortListed"
                        : ""
                    }
                    onClick={() => handleShortlist(post.id)}
                  >
                    <FaRegStar />
                  </li>
                  <button id="cloud" onClick={() => toggleAudio(post.id)}>
                    <FaSoundcloud />
                  </button>
                </div>
                <div
                  className="cloud__video__audio"
                  style={{ display: showAudio[post.id] ? "block" : "none" }}
                >
                  <iframe
                    title="Voiceover Demo"
                    width="100%"
                    height="200"
                    src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1875780321&show_artwork=true&maxheight=390&maxwidth=640"
                  ></iframe>
                </div>
                <div className="voiceCandidateDetails">
                  <Link to={`/talent/${post.id}`}>
                    <span className="">{post.title}</span>
                  </Link>
                  <ul>
                    <li
                      dangerouslySetInnerHTML={{
                        __html: post.acf_fields.key_information,
                      }}
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
