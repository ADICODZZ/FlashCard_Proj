import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const addFlashcard = (newFlashcard) => {
    setFlashcards(prev => [...prev, newFlashcard]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards(prev => prev.filter(fc => fc.id !== id));
  };

  return (
    <FlashcardContext.Provider value={{ flashcards, addFlashcard, deleteFlashcard }}>
      {children}
    </FlashcardContext.Provider>
  );
};
