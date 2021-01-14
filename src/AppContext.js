import React from 'react';

const AppContext = React.createContext({
  isModalOpen: false,
  onModalOpen: () => {},
  onModalClose: () => {},
});

export default AppContext;
