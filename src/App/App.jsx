import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
import AppContext from '../AppContext';
import WorksheetsList from '../WorksheetList';
import Worksheet from '../Worksheet';
import Header from '../Header';
import Banner from '../Banner';
import Modal from '../Modal';
import Dialog from '../Dialog';
import Description from '../Description';

export default function App() {
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUrl = (endpoint) => `${config.API_BASE_URL}/${endpoint}`;
  const fetchOptions = (method, body) => (
    body
      ? {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${config.API_KEY}`,
        },
        body: JSON.stringify(body),
      }
      : {
        method,
        headers: {
          Authorization: `Bearer ${config.API_KEY}`,
        },
      });

  const fetchData = async (url, options) => {
    let resData;
    try {
      const res = await fetch(url, options);
      resData = await res.json();
    } catch (error) {
      setErrorMsg(error.message);
    }
    return resData;
  };

  // Global state for modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  //  Global state for dialog control
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogOriginPosition, setDialogOriginPosition] = useState('');
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleDialogToggle = () => setIsDialogOpen(!isDialogOpen);

  // State to hold api data
  const [clients, setClients] = useState([]);
  const [worksheetTemplates, setWorkSheetTemplates] = useState([]);
  const [worksheetHistory, setWorksheetHistory] = useState([]);

  // Change this value to trigger useEffect
  const [reload, setReload] = useState(false);

  // Fetch data from api on load.
  useEffect(async () => {
    setClients(await fetchData(fetchUrl('clients'), fetchOptions('GET')));
    setWorkSheetTemplates(await fetchData(fetchUrl('templates'), fetchOptions('GET')));
    setWorksheetHistory(await fetchData(fetchUrl('worksheets'), fetchOptions('GET')));
  }, [reload]);

  const routes = () => (
    <>
      <Route exact path="/" component={Banner} />
      <Route exact path="/" component={Description} />

      <Route
        exact
        path="/worksheets"
        render={() => (
          <WorksheetsList
            worksheetHistory={worksheetHistory}
            clients={clients}
          />
        )}
      />
      <Route
        path="/worksheets/:worksheetId"
        component={Worksheet}
      />
    </>
  );

  async function handleNewWorksheet(newWorksheetData, callback) {
    const res = await fetchData(fetchUrl('worksheets'), fetchOptions('POST', newWorksheetData));
    callback(!reload);
    return res;
  }

  async function handleNewClient(newClientData, callback) {
    const res = await fetchData(fetchUrl('clients'), fetchOptions('POST', newClientData));
    callback(!reload);
    return res;
  }

  async function handleNewStatement(newStatementData, callback) {
    const res = await fetchData(fetchUrl('statements'), fetchOptions('POST', newStatementData));
    callback(!reload);
    return res;
  }

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        onModalOpen: handleModalOpen,
        onModalClose: handleModalClose,
        setModalContent,
        isDialogOpen,
        onDialogOpen: handleDialogOpen,
        onDialogClose: handleDialogClose,
        onDialogToggle: handleDialogToggle,
        setDialogContent,
        dialogOriginPosition,
        setDialogOriginPosition,
      }}
    >
      <div id="App" className="main-container primary-bg">
        <Modal
          modalOpen={isModalOpen}
          onModalClose={handleModalClose}
          modalContent={modalContent}
        />
        <Dialog
          dialogOpen={isDialogOpen}
          onDialogClose={handleDialogClose}
          dialogContent={dialogContent}
          dialogOriginPosition={dialogOriginPosition}
        />
        <Header
          setModalContent={setModalContent}
          onModalClose={handleModalClose}
          clients={clients}
          addNewClient={(c) => handleNewClient(c, setReload)}
          worksheetHistory={worksheetHistory}
          addNewWorksheet={(w) => handleNewWorksheet(
            w, setReload,
          )}
          worksheetTemplates={worksheetTemplates}
          addNewStatement={(s) => handleNewStatement(
            s, setReload,
          )}
        />
        <main>
          {(errorMsg) && (
          <section className="error_msg">
            <h3>{errorMsg}</h3>
          </section>
          )}
          {routes()}
        </main>
      </div>
    </AppContext.Provider>
  );
}
