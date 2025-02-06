import "./MainPage.css";
import { useState, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import Carousel from "../../components/carousel/Carousel";
import MovieCard from "../../components/moviecard/MovieCard";
import FilterBar from "../../components/filterbar/Filterbar";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8001/movies/movie");
        const data = await response.json();
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Error fetching the movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Fetch featured movies
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch("http://localhost:8001/featured");
        const data = await response.json();
        setFeaturedMovies(data || []);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };
    fetchFeaturedMovies();
  }, []);

  // Cycle through featured movies
  useEffect(() => {
    if (featuredMovies.length > 0) {
      const preloadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      };

      const interval = setInterval(async () => {
        const nextIndex = (currentIndex + 1) % featuredMovies.length;
        await preloadImage(featuredMovies[nextIndex].background);
        setCurrentIndex(nextIndex);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [featuredMovies, currentIndex]);

  return (
    <div>
      <div className="main-page">
        {featuredMovies.length > 0 && (
          <Featured
            title={featuredMovies[currentIndex].title}
            imdb_score={featuredMovies[currentIndex].imdb_score}
            description={featuredMovies[currentIndex].synopsis}
            genre_chip={featuredMovies[currentIndex].genres || []}
            backgroundImage={featuredMovies[currentIndex].background}
          />
        )}
      </div>
      <Carousel />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} className="filter-container">
            <FilterBar />
          </Col>
          <Col xs={12} md={9}>
            <Container className="card-container">
              <Row className="justify-content-center">
              {movies.map((movie) => (
            <Col key={movie.id} xs={6} sm={6} md={8} lg={3} className="d-flex justify-content-center">
              <MovieCard
                src={movie.src}
                title={movie.title}
                year={movie.year}
                genres={movie.genres}
                rating={movie.rating}
                views={movie.view}
              />
            </Col>
          ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>


    </div>
  );
};

export default MainPage;
