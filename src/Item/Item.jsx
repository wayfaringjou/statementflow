import React, { useRef } from 'react';
import AppContext from '../AppContext';
import componentHelper from '../helpers/componentHelper';
import useClientRect from '../customHooks/useClientRect';
import Note from '../Note';

export default function Item({
  itemInstance,
  sectionKey,
  itemKey,
  // worksheetTemplate,
  // dispatch,
  // setModalContent,
  // onModalOpen,
  // onModalClose,
}) {
  const componentKeys = Object.keys(itemInstance.components);
  const itemMenuEl = useRef(null);
  const [rect, ref] = useClientRect();
  return (
    <AppContext.Consumer>
      {({
        isDialogOpen,
        onDialogOpen,
        onDialogToggle,
        onDialogClose,
        setDialogContent,
        setDialogOriginPosition,
        dialogOriginPosition,
      }) => (
        <article className="worksheet-item col span4 span8 span12">
          <header>
            <h3>{itemInstance.itemName}</h3>
            <button
              type="button"
              ref={ref}
              className="dialog-parent"
              aria-expanded={isDialogOpen}
              aria-controls="item-menu-dialog"
              onClick={() => {
                console.log(rect);
                setDialogOriginPosition(rect);
                setDialogContent(
                  <div
                    onMouseOut={() => {
                      console.log('mouse out');
                      onDialogClose();
                    }}
                    onBlur={onDialogClose()}
                  >
                    Test
                  </div>,
                );
                onDialogToggle();
              }}
            >
              Menu
            </button>
          </header>
          <section className="item-components">
            {/* This function takes item's instance and keys */}
            {componentKeys
              .map((key) => componentHelper(itemInstance, sectionKey, itemKey, key))}
          </section>
          {itemInstance.itemTotal && (
          <section className="item-total">
            Total:
          </section>
          )}
          {itemInstance.itemNote && (
          <Note
            noteContents={itemInstance.itemNote}
          />
          )}
        </article>
      )}
    </AppContext.Consumer>
  );
}
