import React, { useState } from 'react';

const NumberDropdownForm = () => {
  // State to capture the selected number
  const [selectedNumber, setSelectedNumber] = useState('');
  
  // State to store fetched data
  const [fetchedData, setFetchedData] = useState(null);
  
  // Generate numbers array
  const numbers = Array.from({ length: 83 }, (_, i) => i + 1);

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    
    // Check if a number has been selected before fetching data
    if (selectedNumber === '') {
      alert('Please select a number first!');
      return;
    }

    // Fetch data from the API using the selected number
    fetch(`https://swapi.dev/api/people/${selectedNumber}`)
      .then(response => response.json())
      .then(data => {
        // Store the fetched data in state
        setFetchedData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="number-select">Choose a number:</label>
        <select
          id="number-select"
          name='id'
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
          style={{ maxHeight: '150px', overflowY: 'scroll' }} // Set max height for scrollability
        >
          <option value="">--Select a number--</option>
          {numbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>

      {/* Conditionally render the fetched data */}
      {fetchedData && (
        <div>
          <h2>Fetched Data is for: {fetchedData.name}</h2>
          <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NumberDropdownForm;
