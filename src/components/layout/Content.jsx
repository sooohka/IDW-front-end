import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledContent = styled.div`
  padding: 3rem 5rem;
  min-height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Content = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

Content.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Content;
