import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Modal from '../Modal';
import './Header.css';

export default function Header() {
  const modalContent = (
    <>
      <h3>Create new from template</h3>
      <ul>
        <li>
          <Link to="/worksheet/new">Personal</Link>
        </li>
      </ul>
    </>
  );

  return (
    <AppContext.Consumer>
      {({
        isModalOpen, onModalClose, onModalOpen, setModalContent,
      }) => (
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
                <button
                  type="button"
                  onClick={() => {
                    setModalContent(modalContent);
                    onModalOpen();
                  }}
                >
                  New Worksheet
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </AppContext.Consumer>
  );
}
