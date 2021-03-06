import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  min-height: 100%;
  min-width: 100%;
  & > * {
    :last-child {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: auto;
      opacity: 1;
      z-index: 101;
      overflow: hidden;
      min-width: 40rem;
      min-height: 20rem;
    }
  }
`;

const BackDrop = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 100;
`;
export { Modal, BackDrop };
