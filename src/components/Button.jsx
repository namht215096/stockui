import React from 'react';
import axios from 'axios';

const Button = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/run-python');
      alert(response.data);
    } catch (error) {
      alert('Lỗi khi chạy Python script: ' + error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Chạy Python Script
    </button>
  );
};

export default Button;
