import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, searchMovie } from "../redux/actions/postActions";

function PopularMovies() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  console.log(search);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { posts } = useSelector((state) => state.post);
  console.log(posts);
  const movieBanner = posts[Math.floor(Math.random() * posts.length)];

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const { setSearchPost } = useSelector((state) => state.post);
  console.log(setSearchPost);

  useEffect(() => {
    dispatch(searchMovie(search));
  }, [dispatch, search]);

  const moviesFilter = search.length >= 2 ? setSearchPost : posts;

  return (
    <>
      <div className="home-banner">
        <div className="banner-image">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path}`}
            alt=""
            className="image-container"
          />
          <div className="navbar-wrapper">
            <h4>Movielist</h4>
            <input
              type="search"
              name=""
              id=""
              placeholder="What do you want to watch?"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="button-wrapper">
              {isLoggedIn ? (
                <>
                  <Button
                    style={{ zIndex: 1 }}
                    className="logout-button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                      // return navigate("/");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    className="login-button"
                    style={{ zIndex: 1 }}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    className="register-button"
                    style={{ zIndex: 1 }}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="content-wrapper">
            <h3>{movieBanner?.original_title}</h3>
            <p>{movieBanner?.overview}</p>
          </div>
        </div>
      </div>
      <div className="app">
        <div className="app-header">
          <div className="movie-container d-flex flex-wrap m-5">
            {moviesFilter &&
              moviesFilter?.length > 0 &&
              moviesFilter.map((movie, index) => (
                <Card
                  key={index}
                  variant="secondary"
                  className="card-img mx-4 mb-2"
                  style={{ width: "18rem" }}
                >
                  <Card.Img />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt=""
                    />
                    <Link to={`/Detail/${movie.id}`}>
                      {" "}
                      <Button className="btn btn-success">Detail</Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularMovies;
