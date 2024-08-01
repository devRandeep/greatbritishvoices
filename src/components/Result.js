import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { FaRegStar, FaSoundcloud } from "react-icons/fa";

export default function Result() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [newsPosts, setNewsPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorite");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [showAudio, setShowAudio] = useState({});

  const fetchAllPages = async () => {
    let allPosts = [];
    let page = 1;
    let totalPages = 1; // default value, will be updated dynamically

    while (page <= totalPages) {
      try {
        const response = await fetch(
          `https://greatbritishvoices.co.uk/wp-json/custom/v1/talents?page=${page}`
        );
        const json = await response.json();
        allPosts = allPosts.concat(json.posts);

        // Set the totalPages based on the response from the first request
        if (page === 1) {
          totalPages = json.total_pages || 1; // Assume 1 page if not provided
        }
        page++;
      } catch (error) {
        console.error("Error fetching data:", error);
        break; // Exit the loop on error
      }
    }

    return allPosts;
  };

  useEffect(() => {
    fetchAllPages().then((allPosts) => {
      setNewsPosts(allPosts);
      setIsLoaded(true);
    });
  }, []); // Fetch data only once on component mount

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

  useEffect(() => {
    if (query) {
      const filteredResults = newsPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filteredResults);
    } else {
      setFilteredPosts(newsPosts);
    }
  }, [query, newsPosts]); // Update filtered results when query or newsPosts change

  if (!isLoaded) {
    return (
      <div className="please_wait">
        {" "}
        <div className="loader"></div>
        <span>Data Loading....</span>
      </div>
    );
  }

  return (
    <div className="searchResult p-5 pb-0">
      <Row className="row-gap-3">
        <div className="searchPanel">
          <p>{filteredPosts.length} Voice(s) Found</p>
          <Link to="/voicecards">
            Clear Filters
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="red"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {filteredPosts.map((post, index) => (
          <Col md={3} key={index}>
            <div className="voiceBox">
              <div className="profileImage">
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
                  <span>{post.title}</span>
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
  );
}
