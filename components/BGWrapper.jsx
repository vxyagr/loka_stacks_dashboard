import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#123056] to-[#188565] bg-no-repeat bg-cover">
      {children}
    </div>
  );
};

export default BackgroundWrapper;
