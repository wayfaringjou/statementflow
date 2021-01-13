import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Modal from '../Modal';
import './Header.css';

export default function Header() {
  return (
    <AppContext.Consumer>
      {({ isModalOpen, onModalClose, onModalOpen }) => (
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
                  Worksheet History
                </Link>
              </li>
              <li>
                <button type="button" onClick={onModalOpen}>
                  New Worksheet
                </button>
              </li>
            </ul>
          </nav>
          <Modal modalOpen={isModalOpen} onModalClose={onModalClose}>
            Create new statement from template
          </Modal>
        </header>
      )}
    </AppContext.Consumer>
  );
}
