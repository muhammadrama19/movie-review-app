import './MainPage.css';
import { useState, useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import Carousel from '../../components/carousel/Carousel';

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8001/featured');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching the movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const preloadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      };
      const interval = setInterval(async () => {
        const nextIndex = (currentIndex + 1) % movies.length;
        await preloadImage(movies[nextIndex].background);
        setCurrentIndex(nextIndex);
      }, 5000); 

      return () => clearInterval(interval); 
    }
  }, [movies, currentIndex]);

  return (
    <div>
      <div className='main-page'>
      {movies.length > 0 && (
        <Featured
          title={movies[currentIndex].title}
          imdb_score={movies[currentIndex].imdb_score}
          description={movies[currentIndex].synopsis}
          genre_chip={movies[currentIndex].genres || []} 
          backgroundImage={movies[currentIndex].background} 
        />
      )}
    </div>
      <Carousel />

    </div>
    
  
  );
};

export default MainPage;