import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="page-content">
    <h4>SongBuzz</h4>
    <p>Welcome to SongBuzz.</p>
    <p>Click <Link to="/login">here</Link> to login.</p>
    <p>Click <Link to="/signup">here</Link> to signup.</p>
  </div>
);
