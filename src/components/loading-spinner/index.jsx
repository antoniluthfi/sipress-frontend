import React from "react";

const LoadingSpinner = ({ isLoading = true }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-500 text-lg">Data tidak ditemukan</p>
    </div>
  );
};

export default LoadingSpinner;
