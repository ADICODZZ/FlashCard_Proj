import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Flashcard from './Flashcard'; // Ensure the Flashcard component is correctly imported
import axios from 'axios';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './Flashcardviewer.css'; // Import custom styles for the carousel

const FlashcardViewer = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    adaptiveHeight: true,
    pauseOnHover: true, // Enable pause on hover (optional)
    pauseOnFocus: true, // Enable pause on focus (optional)
  };

  const handleCardClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the carousel
  };

  return (
    <div className="flashcard-viewer-container bg-gray-900 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Flashcard App</h1>
      <div className="flashcard-slider-container bg-gray-900">
        {flashcards.length > 0 ? (
          <Slider {...settings} paused={paused}>
            {flashcards.map((flashcard) => (
              <div key={flashcard.id} className="px-4" onClick={handleCardClick}>
                <Flashcard 
                  question={flashcard.question}
                  correctAnswer={flashcard.answer}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-500 text-lg text-center">No flashcards available.</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardViewer;
