import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setSelectedName('');
    setPopupOpen(e.target.value !== '');
  };

  const handleNameClick = (name) => {
    setSelectedName(name);
    setSearch(name);
    setPopupOpen(false);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setSearch('');
    setSelectedName('');
    setPopupOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    (user.name.first.toLowerCase().includes(search.toLowerCase()) ||
      user.name.last.toLowerCase().includes(search.toLowerCase())) &&
    (selectedGender === '' || user.gender === selectedGender)
  );

  return (
    <div className="App">
      <h1>SEARCH</h1>
      <div>
        <input type="text" value={search} onChange={handleInputChange} placeholder="Search by name" />
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {isPopupOpen && users.length > 0 && (
        <div className="popup">
          <div className="popup-content">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className={`name-item ${selectedName === user.name.first ? 'selected' : ''}`}
                onClick={() => handleNameClick(user.name.first)}
              >
                {user.name.first} {user.name.last} ({user.gender})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
