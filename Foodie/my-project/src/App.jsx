import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [translateResult, setTranslateResult] = useState("");
  const [language, setLanguage] = useState("es"); // Default language: Spanish
  const [error, setError] = useState("");

  // List of languages (You can replace this with an API call if needed)
  const supportedLanguages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
  ];

  const fetchTranslation = async () => {
    const options = {
      method: "GET",
      url: "https://google-translate-official.p.rapidapi.com/translate",
      params: { text: searchInput, target: language },
      headers: {
        "x-rapidapi-key": "3d88784c5amsh44e9a1be97ec29bp1bde41jsn86c8fd033dca",
        "x-rapidapi-host": "google-translate-official.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const result = response.data;

      if (result.translation) {
        setTranslateResult(result.translation); // Adjust based on actual API response structure
        console.log(result)
        setError("");
      } else {
        setError("Translation not found or an error occurred.");
      }
    } catch (err) {
      setError("Failed to fetch translation. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      setError("Please enter text to translate.");
      return;
    }
    fetchTranslation();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      {/* Search Form */}
      <div className="flex items-center justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2"
        >
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter text to translate..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700"
          >
            Translate
          </button>
        </form>
      </div>

      {/* Display Results */}
      <div className="mt-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {translateResult && (
          <p className="text-lg">
            <span className="font-bold">Translation:</span> {translateResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;




// const App = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [word, setWord] = useState("");
//   const [definition, setDefinition] = useState("");
//   const [error, setError] = useState("");

//   const dictionary = async (wordToSearch) => {
//     const options = {
//       method: "GET",
//       url: `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary`,
//       params: { word: wordToSearch },
//       headers: {
//         "x-rapidapi-key": "3d88784c5amsh44e9a1be97ec29bp1bde41jsn86c8fd033dca",
//         "x-rapidapi-host": "dictionary-by-api-ninjas.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       const result = response.data;

//       if (result.word && result.definition) {
//         setWord(result.word);
//         setDefinition(result.definition);
//         setError("");
//       } else {
//         setError("Word not found or an error occurred.");
//       }
//     } catch (err) {
//       if (err.response) {
//         setError(`Error: ${err.response.data.message || "Failed to fetch word."}`);
//       } else if (err.request) {
//         setError("Error: No response from the server. Please try again later.");
//       } else {
//         setError("Error: An unexpected error occurred.");
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim() === "") {
//       setError("Please enter a word to search.");
//       return;
//     }
//     dictionary(searchInput);
//   };
