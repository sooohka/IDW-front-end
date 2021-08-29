import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledContent = styled.div`
  padding: 3rem;
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;
const Content = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

Content.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Content;
