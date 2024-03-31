import React, { useEffect } from "react";

function SearchBox({ onChange }) {
  // Function to focus the search box on Cmd+k or Ctrl+k
  const handleKeyPress = (event) => {
    if (event.key === "k" && event.ctrlKey) {
      console.log("ctrl k pressed");
      console.log(document.querySelector(".form-group .form-field"));
      document.querySelector(".form-group .form-field").focus();
    }
  };
  // Listens to keypress event
  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className="form-group">
        <img
          width="45"
          height="45"
          src="https://img.icons8.com/ios/50/search--v1.png"
          alt="search-img"
        />
        <input
          className="form-field"
          placeholder="Search countries..."
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default SearchBox;
