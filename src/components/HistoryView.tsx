import React, { FC, useState } from "react";
import { Action } from "@reduxjs/toolkit";
import { styled } from "storybook/theming";
import { STORY_CHANGED } from "storybook/internal/core-events";
import { useAddonState, useChannel } from "storybook/internal/manager-api";
import { OnDispatchEvent } from "../types";
import { EVENTS, STATE_ID_HISTORY } from "../constants";
import { parse } from "../utils/jsonHelper";

const reducer = (
  events: OnDispatchEvent[],
  event: OnDispatchEvent,
): OnDispatchEvent[] => {
  if (events === undefined) events = [];
  return [...events, event];
};

const JsonCellStyle = styled.div(() => ({
  whiteSpace: "pre",
  height: "1.5em",
  lineHeight: "1.2em",
  overflow: "hidden",
  paddingTop: "0.2em",
  cursor: "pointer",
}));

const ThStyle = styled.th(({ theme }) => ({
  borderBottom: `1px solid ${theme.color.medium}`,
  textAlign: "left",
  padding: "0.5em",
  background: theme.color.secondary,
  color: theme.color.tertiary,
}));

const TdStyle = styled.td(({ theme }) => ({
  padding: "0 0.5em",
  margin: "0",
  borderBottom: `1px solid ${theme.color.medium}`,
  verticalAlign: "top",
  whiteSpace: "nowrap",
  lineHeight: "1.8em",
  color: theme.color.dark,
  background: "#ffffff",
}));

const TableStyle = styled.table(() => ({
  borderCollapse: "collapse",
  width: "100%",
}));

const expandedCellStyle = {
  height: "initial",
};

const Json: FC<{ data: any }> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <JsonCellStyle
      onClick={onClick}
      style={expanded ? expandedCellStyle : undefined}
    >
      {expanded ? JSON.stringify(data, null, 2) : "..."}
    </JsonCellStyle>
  );
};

const Header: FC<{}> = () => {
  return (
    <tr>
      <ThStyle>Time</ThStyle>
      <ThStyle>Type</ThStyle>
      <ThStyle>Action</ThStyle>
      <ThStyle>Diff</ThStyle>
      <ThStyle>Previous State</ThStyle>
      <ThStyle>Current State</ThStyle>
      <ThStyle> </ThStyle>
    </tr>
  );
};

const s = (i: number): string => String(i);

const formatDate = (d: Date): string => {
  try {
    return (
      s(d.getHours()) +
      ":" +
      s(d.getMinutes()) +
      ":" +
      s(d.getSeconds()) +
      "." +
      s(d.getMilliseconds())
    );
  } catch (err) {
    return "";
  }
};

interface RowProps extends OnDispatchEvent {
  emit: (eventName: string, ...args: any[]) => void;
}

const Row: FC<RowProps> = ({ date, action, diff, prev, state, emit }) => {
  return (
    <tr>
      <TdStyle>{formatDate(date)}</TdStyle>
      <TdStyle>
        <b>{action.type}</b>
      </TdStyle>
      <TdStyle>
        <Json data={action} />
      </TdStyle>
      <TdStyle>
        <Json data={parse(diff)} />
      </TdStyle>
      <TdStyle>
        <Json data={parse(prev)} />
      </TdStyle>
      <TdStyle>
        <Json data={parse(state)} />
      </TdStyle>
      <TdStyle>
        <button onClick={() => emit(EVENTS.SET_STATE, state)}>Load</button>
      </TdStyle>
    </tr>
  );
};

const HistoryView: FC<{}> = () => {
  const [events, setEvents] = useAddonState<OnDispatchEvent[]>(
    STATE_ID_HISTORY,
    [],
  );

  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (event: OnDispatchEvent) =>
      setEvents((events) => reducer(events, event)),
    [STORY_CHANGED]: (_action: Action) => setEvents([]),
  });

  return (
    <TableStyle>
      <thead>
        <Header />
      </thead>
      <tbody>
        {events.map((event) => (
          <Row key={event.id} emit={emit} {...event} />
        ))}
      </tbody>
    </TableStyle>
  );
};

export default HistoryView;
