import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CarouselCard from "../carouselcard/CarouselCard";
import "./Carousel.css";


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="sliderArrow forward" onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="sliderArrow back" onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  );
};

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const response = await fetch("http://localhost:8001/top-rated");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopRated();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="lists">
      <div className="wrapperList">
        <Slider {...settings}>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <CarouselCard
                key={index}
                imageUrl={movie.background || "https://via.placeholder.com/196x294?text=No+Image+Available"}
                rating={movie.imdb_score || "N/A"}
                title={movie.title || "No Title Available"}
                description={movie.synopsis || "No Description Available"}
              />
            ))
          ) : (
            <p>No movies available</p>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
