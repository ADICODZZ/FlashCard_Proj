import React, { useState, useContext, useEffect } from 'react';
import { FlashcardContext } from './FlashcardContext';
import axios from 'axios';

const Dashboard = ({  }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [flashcardData, setFlashcardData] = useState({ question: '', answer: '' });
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const { addFlashcard, deleteFlashcard, flashcards, setFlashcards } = useContext(FlashcardContext);

  useEffect(() => {
    if (activeFeature === 'edit' || activeFeature === 'delete') {
      refreshFlashcards();
    }
  }, [activeFeature, setFlashcards]);

  const refreshFlashcards = () => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => console.error('Error fetching flashcards:', error));
  };

  const handleAddFlashcard = () => {
    if (!flashcardData.question || !flashcardData.answer) {
      alert('Please fill in both fields');
      return;
    }

    axios.post('http://localhost:5000/api/flashcards', flashcardData)
      .then(response => {
        addFlashcard(response.data);
        setFlashcardData({ question: '', answer: '' });
        setActiveFeature(null);
        refreshFlashcards(); // Refresh the list after adding
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  const handleEditFlashcard = () => {
    if (!selectedQuestion || !flashcardData.question || !flashcardData.answer) {
      alert('Please select a flashcard and fill in both fields');
      return;
    }

    axios.put(`http://localhost:5000/api/flashcards/${selectedQuestion}`, flashcardData)
      .then(response => {
        addFlashcard(response.data);
        setFlashcardData({ question: '', answer: '' });
        setSelectedQuestion('');
        setActiveFeature(null);
        refreshFlashcards(); // Refresh the list after editing
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  const handleDeleteFlashcard = () => {
    if (!selectedQuestion) {
      alert('Please select a flashcard to delete');
      return;
    }

    axios.delete(`http://localhost:5000/api/flashcards/${selectedQuestion}`)
      .then(() => {
        deleteFlashcard(selectedQuestion);
        setSelectedQuestion('');
        setActiveFeature(null);
        refreshFlashcards(); // Refresh the list after deleting
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <div className="h-full p-6  bg-gray-800 text-white overflow-auto relative">
      
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex flex-col space-y-4">
        <button onClick={() => setActiveFeature('add')} className="p-3 bg-green-600 rounded-lg shadow hover:bg-green-700 transition duration-300">
          Add Flashcard
        </button>
        <button onClick={() => setActiveFeature('edit')} className="p-3 bg-yellow-600 rounded-lg shadow hover:bg-yellow-700 transition duration-300">
          Edit Flashcard
        </button>
        <button onClick={() => setActiveFeature('delete')} className="p-3 bg-red-600 rounded-lg shadow hover:bg-red-700 transition duration-300">
          Delete Flashcard
        </button>
      </div>

      {/* Add Flashcard Modal */}
      {activeFeature === 'add' && (
        <div className="flex items-center gap-2 mt-6 justify-center bg-gray-700 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative">
            <h3 className="text-xl font-semibold mb-4">Add Flashcard</h3>
            <input
              type="text"
              placeholder="Question"
              value={flashcardData.question}
              onChange={(e) => setFlashcardData({ ...flashcardData, question: e.target.value })}
              className="mb-2 w-full text-black p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Answer"
              value={flashcardData.answer}
              onChange={(e) => setFlashcardData({ ...flashcardData, answer: e.target.value })}
              className="mb-4 w-full text-black p-2 border border-gray-300 rounded"
            />
            <button onClick={handleAddFlashcard} className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add
            </button>
            <button onClick={() => setActiveFeature(null)} className="w-full p-2 bg-gray-300 text-gray-700 rounded-lg mt-4 hover:bg-gray-400">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Flashcard Modal */}
      {activeFeature === 'edit' && (
        <div className="flex items-center mt-6 justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative">
            <h3 className="text-xl font-semibold mb-4">Edit Flashcard</h3>
            <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              className="mb-4 w-full text-black p-2 border border-gray-300 rounded"
            >
              <option value="">Select a question</option>
              {flashcards.map(flashcard => (
                <option key={flashcard._id} value={flashcard._id}>
                  {flashcard.question}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Question"
              value={flashcardData.question}
              onChange={(e) => setFlashcardData({ ...flashcardData, question: e.target.value })}
              className="mb-2 w-full p-2 text-black border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Answer"
              value={flashcardData.answer}
              onChange={(e) => setFlashcardData({ ...flashcardData, answer: e.target.value })}
              className="mb-4 w-full p-2 text-black border border-gray-300 rounded"
            />
            <button onClick={handleEditFlashcard} className="w-full p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
              Save Changes
            </button>
            <button onClick={() => setActiveFeature(null)} className="w-full p-2 bg-gray-300 text-gray-700 rounded-lg mt-4 hover:bg-gray-400">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Flashcard Modal */}
      {activeFeature === 'delete' && (
        <div className="flex items-center mt-6 justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative">
            <h3 className="text-xl font-semibold mb-4">Delete Flashcard</h3>
            <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              className="mb-4 w-full p-2 border text-black border-gray-300 rounded"
            >
              <option value="">Select a question</option>
              {flashcards.map(flashcard => (
                <option key={flashcard._id} value={flashcard._id}>
                  {flashcard.question}
                </option>
              ))}
            </select>
            <button onClick={handleDeleteFlashcard} className="w-full p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete
            </button>
            <button onClick={() => setActiveFeature(null)} className="w-full p-2 bg-gray-300 text-gray-700 rounded-lg mt-4 hover:bg-gray-400">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
