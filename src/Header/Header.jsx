import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header id="main-header" className="flex-row-parent">
      <h2>
        <Link to="/">
          StatementFlow
        </Link>
      </h2>
      <nav id="main-nav">
        <ul>
          <li>
            <Link to="/worksheets">
              Worksheets
            </Link>
          </li>
          <li>
            <Link to="/statements">
              New Statement
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
