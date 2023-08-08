import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="min-h-screen background-static overflow-auto h-[100vh] ">
      {children}
    </div>
  );
};

export default BackgroundWrapper;
