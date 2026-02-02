"use client"
import React, { useReducer, useState } from 'react';

// 1. Định nghĩa kiểu dữ liệu cho State
interface FeedbackState {
  phoneNumber: string;
  description: string;
}

// 2. Định nghĩa các loại hành động (Action Types)
type FeedbackAction =
  | { type: 'SET_FIELD'; field: keyof FeedbackState; value: string }
  | { type: 'RESET_FORM' };

// 3. Hàm Reducer để xử lý logic cập nhật State
const feedbackReducer = (state: FeedbackState, action: FeedbackAction): FeedbackState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return { phoneNumber: '', description: '' };
    default:
      return state;
  }
};

const FeedbackForm: React.FC = () => {
  // Sử dụng useReducer thay cho useState cho dữ liệu form
  const [state, dispatch] = useReducer(feedbackReducer, {
    phoneNumber: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', content: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name as keyof FeedbackState,
      value: e.target.value,
    });
  };

  const handleCustomSubmit = async () => {
    // Kiểm tra nhanh tính hợp lệ trước khi submit
    if (!state.phoneNumber || !state) {
      setMessage({ type: 'error', content: 'Vui lòng điền đầy đủ thông tin.' });
      return;
    }
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Gửi log dữ liệu từ state của useReducer
      console.log('Dữ liệu submit:', state);
      
      // Giả lập delay API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', content: `Info: ${state.phoneNumber}-${state.description}` });
      dispatch({ type: 'RESET_FORM' });
    } catch (err) {
      setMessage({ type: 'error', content: 'Có lỗi xảy ra khi gửi dữ liệu.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact us</h2>
      
      {/* Sử dụng thẻ div thay cho thẻ form */}
      <div className="space-y-4">
        {/* Số điện thoại */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="0912345678"
            value={state.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Nội dung phản hồi */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Description"
            value={state.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.content}
          </div>
        )}

        <button
          type="button"
          onClick={handleCustomSubmit}
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all ${
            isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-sky-500 hover:bg-sky-600 active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm