import React, { Fragment, memo, useCallback, useState, useEffect } from "react";
import { Result } from "src/types";
import { AddonPanel } from "storybook/internal/components";
import { Button, Placeholder, TabsState, Tabs, Form } from "storybook/internal/components";
import { useChannel, useGlobals } from "storybook/internal/manager-api";
import { styled, useTheme } from "storybook/internal/theming";

import { EVENTS } from "../constants";
import { List } from "./List";

interface PanelProps {
  active: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const Panel = ({ active }) => {
  const rest = useGlobals();
  const [reducersData, setReducersData] = useState({});

  console.log('rest', rest)
  console.log('isActive', active)

  const handleInputChange = (key, value) => {
    const updatedData = {
      ...reducersData,
      [key]: value,
    };
    setReducersData(updatedData);
    // extendReducers(updatedData);
  };

  return (
    active && (
      <Tabs
        tabs={[
          {
            id: 'inputs',
            title: 'Editable Inputs',
            render: () => (
              <Form>
                {Object.keys(reducersData).map((key) => (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  </div>
                ))}
              </Form>
            ),
          },
          {
            id: 'json',
            title: 'JSON View',
            render: () => <div>{JSON.stringify(reducersData)}</div>,
          },
        ]}
      />
    )
  );
};
