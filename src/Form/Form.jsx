/* eslint-disable no-param-reassign */
import React, { useReducer, useMemo, useCallback } from 'react';
// import Immutable from 'immutable';

// the reducer (similar to what we'd have in redux)
const formReducer = (state, { field, value }) => state.set(field, value);

// the initial state (separated out here in case we wish to easily reset the state)
const initialState = {
  name: '',
  address: '',
  age: '',
  favouriteSubject: '',
  likesChess: false,
};
console.log(new Map(initialState));
// the field names (useful below)
const fieldNames = Object.keys(initialState);

const Form = () => {
  // get current state and the dispatcher, wrap the state as an immutable map
  const [state, dispatch] = useReducer(formReducer, new Map(initialState));

  // build the onChange handlers
  const handlers = fieldNames.reduce((m, field) => {
    // the onChange handler for this field is only re-created if the dispatch method changes
    // eslint-disable-next-line max-len
    m[field] = useCallback((e) => dispatch({ field, value: e.currentTarget.value }), [field, dispatch]);
    console.log(m);
    return m;
  }, {});

  // convert the immutable back to an object for easy access
  const stateAsObj = useMemo(() => state.toObject(), [state]);

  return (
    <form>
      {fieldNames.forEach((field) => (
        <input key={field} type="text" value={stateAsObj[field]} onChange={handlers[field]} />
      ))}
    </form>
  );
};

export default Form;
