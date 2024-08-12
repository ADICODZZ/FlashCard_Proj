import React, { useState } from 'react';
import './Flashcard.css'; // Import CSS for animations and transitions

const Flashcard = ({ question, correctAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleCardClick = () => {
    if (isFlipped) {
      // Show question when card is flipped back
      setFeedback(null);
    } else {
      // Show feedback when card is flipped to the back
      if (userAnswer === correctAnswer) {
        setFeedback({ message: 'Right answer!', emoji: '😊' });
      } else if (userAnswer.trim() === '') {
        setFeedback({ message: 'Keep learning!', emoji: '📚' });
      } else {
        setFeedback({ message: 'Keep trying!', emoji: '🤔' });
      }
    }
    setIsFlipped(!isFlipped);
  };

  const handleCheckAnswer = (e) => {
   // Prevents click event from bubbling up to handleCardClick
    handleCardClick(); // Flip the card when checking the answer
  };

  const handleInputChange = (e) => {
    // Prevents click event from bubbling up
    setUserAnswer(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div
        className={`relative w-64 h-96 perspective-1000`}
        
      >
        <div className={`flip-card w-full h-full ${isFlipped ? 'flip' : ''}`}>
          <div className="flip-card-inner">
            {/* Front Side */}
            <div className="flip-card-front bg-blue-500 text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-lg backface-hidden">
              <h2 className="text-2xl font-semibold mb-4">Question</h2>
              <p className="text-lg mb-4">{question}</p>
              <input
                
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
                className="p-2 border text-black border-gray-300 rounded mb-2 w-3/4"
                placeholder="Enter your answer"
              />
              <button
                onClick={handleCheckAnswer}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Check
              </button>
            </div>
            {/* Back Side */}
            <div className="flip-card-back bg-white text-black flex flex-col items-center justify-center p-4 rounded-lg shadow-lg rotate-y-180 backface-hidden"
            onClick={handleCardClick}>
              {feedback && (
                <div className="text-center">
                  <p className="text-xl font-semibold">{feedback.message}</p>
                  <p className="text-2xl">{feedback.emoji}</p>
                  <p className="text-xl font-semibold">The answer is:</p>
                  <p className="text-2xl text-black">{correctAnswer}</p>
                </div>
              )}
              {!feedback && (
                <div className="text-center">
                  <p className="text-xl font-semibold">The answer is:</p>
                  <p className="text-2xl text-black">{correctAnswer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
