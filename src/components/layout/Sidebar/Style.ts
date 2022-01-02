import React, { useContext } from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  height: 100%;
`;

const ListItem = styled.li`
  margin: 1.5rem 0 0 0;
  &:last-child {
    margin: 1.5rem 0 5rem 0;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1rem;
  border-bottom: 0.6rem solid black;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export { Sidebar, List, Divider, ListItem };
