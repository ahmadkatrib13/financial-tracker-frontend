import React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const Tab = styled(TabUnstyled)`
  box-shadow: rgb(239 242 245) 0px 1px 0px;
  color: rgb(88, 102, 126);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 800;
  background-color: transparent;
  /* width: 100%; */
  padding: 7px 8px;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: rgb(248, 250, 253);
    font-weight: 600;
  }

  &:focus {
    color: rgb(88, 102, 126);
  }

  &.${tabUnstyledClasses.selected} {
    background-color: rgb(255, 255, 255);
    color: rgb(88, 102, 126);
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  width: fit-content;
  background-color: rgb(239, 242, 245);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  padding: 3px;
`;

function TimeType(props) {
  return (
    <TabsUnstyled
      style={{ alignSelf: "end" }}
      defaultValue={"monthly"}
      onChange={(event, newValue) => {
        console.log(newValue);
        props.setValue(newValue);
        props.setRange(0);
      }}
    >
      <TabsList>
        <Tab value={"weekly"}>Week</Tab>
        <Tab value={"monthly"}>Month</Tab>
        <Tab value={"yearly"}>Year</Tab>
      </TabsList>
    </TabsUnstyled>
  );
}

export default TimeType;
