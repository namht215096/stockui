import React from 'react';
import axios from 'axios';

const Button = ({ 
  endpoint, 
  buttonText = "Chạy Python Script", 
  successMessage = "Thành công!", 
  className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
}) => {
  const handleClick = async () => {
    try {
      const response = await axios.get(`http://localhost:5000${endpoint}`);
      alert(response.data || successMessage);
    } catch (error) {
      alert('Lỗi khi chạy Python script: ' + error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {buttonText}
    </button>
  );
};

export default Button;