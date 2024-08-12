import React from 'react';
import Flashcard from './FlashCardViewer';
import { mockFlashcards } from '../utils/mockData';

function FlashcardList() {
  return (
    <div className="flashcard-list">
      {mockFlashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} {...flashcard} />
      ))}
    </div>
  );
}

export default FlashcardList;
