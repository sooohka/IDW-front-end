import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Text from "../common/Text";
import { theme } from "../../style/theme";

const sidebarWidth = "20rem";

const StyledSidebar = styled.div`
  width: ${sidebarWidth};
  height: 100%;
`;

const StyledList = styled.li`
  margin: 1.5rem 0 0 0;
  &:last-child {
    margin: 1.5rem 0 5rem 0;
  }
`;

const List = ({ text }) => (
  <StyledList>
    <Text text={text} fontSize={theme.fonts.strongBody} />
  </StyledList>
);

const Divider = styled.div`
  width: 100%;
  height: 1rem;
  border-bottom: 0.6rem solid black;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const Ul = ({ title, list }) => {
  return (
    <StyledUl>
      <Text bold fontSize={theme.fonts.heading} text={title} />
      <Divider />
      {list.map((li) => (
        <List text={li} />
      ))}
    </StyledUl>
  );
};

const Sidebar = () => {
  const categoryList = ["연예인", "음식", "애니메이션"];
  const sortList = ["인기순", "오래된 날짜순", "염둥"];
  return (
    <StyledSidebar>
      <Ul title="카테고리" list={categoryList} />
      <Ul title="정렬" list={sortList} />
    </StyledSidebar>
  );
};

export default Sidebar;
List.propTypes = {
  text: PropTypes.string.isRequired,
};

Ul.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};
