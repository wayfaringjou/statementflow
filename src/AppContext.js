import React from 'react';

const AppContext = React.createContext({
  isModalOpen: false,
  onModalOpen: () => {},
  onModalClose: () => {},
  setModalContent: () => {},
  isDialogOpen: false,
  onDialogOpen: () => {},
  onDialogClose: () => {},
  onDialogToggle: () => {},
  setDialogContent: () => {},
  dialogOriginPosition: '',
  setDialogOriginPosition: () => {},
});

export default AppContext;
