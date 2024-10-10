/*
import React, { useState } from 'react';
import './styles.css'; // Import your CSS file

function FormExample() {
  // State variables to store input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handler functions to update state variables
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Submit handler to display input values
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can use the stored values fodr further processing here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Optionally reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <h2>React Form Example</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormExample;



// Example 2
import React, { useState } from 'react';

function FormExample() {
  // State object to store all input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Universal handler function for input changes
  const onChane = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData, // Keep other fields unchanged
      [name]: value, // Update the specific field with computed property name
    });
  };

  // Submit handler to display input values
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Reset form fields (optional)
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  console.log(formData.name)

  return (
    <div className="form-container">
      <h2>React Form with Universal Handler</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name" // The 'name' attribute should match the state property
            value={formData.name}
            onChange={onChane}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" // The 'name' attribute should match the state property
            value={formData.email}
            onChange={onChane}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password" // The 'name' attribute should match the state property
            value={formData.password}
            onChange={onChane}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormExample;
*/

import React, { useState } from 'react';

function FormExample() {
  // State variables to store input values
  const [name, setName] = useState('');

  // Handler functions to update state variables
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // Submit handler to display input values
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can use the stored values fodr further processing here
    console.log('Name:', name);

    // Optionally reset form fields
    setName('');
  };

  console.log(name)

  return (
    <div className="form-container">
      <h2>React Form Example</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormExample;
