import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${searchTerm}`
        );
        setUsers(response.data.items);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (searchTerm) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  return (
    <div className='container'>
              <input
          type="text"
          placeholder="Search for GitHub users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-full-width"
        />
      <div>
  {users.map((user) => (
    <div key={user.id} className="user-card">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      <h3>{user.login}</h3>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        Profile Link
      </a>
    </div>
  ))}
</div>
    </div>
  );
};

export default Search;
