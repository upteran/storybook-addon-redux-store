import React, { useEffect, useState } from 'react';
import { useParameter, useStorybookState } from '@storybook/api';
import { Tabs, Tab, Form, Textarea } from '@storybook/components';
import { getStore, extendReducers } from './store';

export const Panel = ({ active }) => {
  const state = useStorybookState();
  const parameters = useParameter('reduxToolkit', null); // Parameters passed in `argTypes`
  const [reducersData, setReducersData] = useState({});

  useEffect(() => {
    if (parameters?.initialReducers) {
      const store = getStore();
      if (!store) {
        initStore(parameters.initialReducers);
      } else {
        extendReducers(parameters.initialReducers);
      }
      setReducersData(parameters.initialReducers);
    }
  }, [parameters]);

  const handleInputChange = (key, value) => {
    const updatedData = {
      ...reducersData,
      [key]: value,
    };
    setReducersData(updatedData);
    extendReducers(updatedData);
  };

  return (
    active && (
      <Tabs>
        <Tab id="inputs" title="Editable Inputs">
          <Form>
            {Object.keys(reducersData).map((key) => (
              <div key={key}>
                <label>{key}</label>
                <input
                  type="text"
                  value={reducersData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            ))}
          </Form>
        </Tab>
        <Tab id="json" title="JSON View">
          <Textarea value={JSON.stringify(reducersData, null, 2)} readOnly />
        </Tab>
      </Tabs>
    )
  );
};

export default Panel;
