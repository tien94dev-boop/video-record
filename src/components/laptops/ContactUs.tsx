"use client"
import React, { useReducer, useState } from 'react';

// 1. Define State Interface
interface FeedbackState {
  purpose: string;
  description: string;
}

// 2. Define Action Types
type FeedbackAction =
  | { type: 'SET_FIELD'; field: keyof FeedbackState; value: string }
  | { type: 'RESET_FORM' };

// 3. Reducer Logic
const feedbackReducer = (state: FeedbackState, action: FeedbackAction): FeedbackState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return { purpose: '', description: '' };
    default:
      return state;
  }
};

// Assuming 'laptops' is the data you fetched from your API
interface Laptop {
  id: string | number;
  name: string;
  category: string; // e.g., 'Gaming', 'Office', 'Workstation'
}

interface Props {
  laptops?: Laptop[];
}

const RecommendationForm: React.FC<Props> = ({ laptops = [] }) => {
  const [state, dispatch] = useReducer(feedbackReducer, {
    purpose: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<Laptop[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', content: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name as keyof FeedbackState,
      value: e.target.value,
    });
  };

  const handleCustomSubmit = async () => {
    if (!state.purpose || !state.description) {
      setMessage({ type: 'error', content: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simple Filtering Logic: Match purpose with laptop category
      // Note: You can adjust 'item.category' to match your actual API data structure
      const filtered = laptops.filter(laptop => 
        laptop.category.toLowerCase().includes(state.purpose.toLowerCase())
      ).slice(0, 3); // Get top 3 matches

      setRecommendations(filtered);
      setMessage({ type: 'success', content: `Info: ${state.purpose}-${state.description}` });
      
    } catch (err) {
      setMessage({ type: 'error', content: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold mb-2">Recommendation Form</h2>

      <div className="space-y-5">
        {/* Purpose Selection */}
        <div>
          <label htmlFor="purpose" className="block text-sm font-semibold mb-1">
            What is your primary use case?
          </label>
          <select
            id="purpose"
            name="purpose"
            value={state.purpose}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white cursor-pointer"
          >
            <option value="">-- Select your need --</option>
            <option value="Work / Office">Work / Office</option>
            <option value="Gaming & Entertainment">Gaming & Entertainment</option>
            <option value="Design / Video Editing">Design / Video Editing</option>
            <option value="Software Development">Software Development</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-1">
          Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="e.g., I need a long battery life or a lightweight design..."
            value={state.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          />
        </div>

        {message && (
          <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.content}
          </div>
        )}

        {/* Display Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm font-bold text-blue-800 mb-2">Recommended for you:</p>
            <ul className="list-disc ml-5 space-y-1">
              {recommendations.map(laptop => (
                <li key={laptop.id} className="text-sm text-blue-700 font-medium">{laptop.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleCustomSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-md transition-all ${
            isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600 active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? 'Searching...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default RecommendationForm;