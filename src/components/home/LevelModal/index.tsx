import React, { useContext, useState } from "react";
import ModalContext from "../../../utils/contexts/ModalContext";
import Button from "../../common/Button";
import RadioField from "../../common/RadioField";
import XButton from "../../common/XButton";
import Modal from "../../layout/Modal";
import * as S from "./Style";

const LevelModal = () => {
  const { handleModalSubmit, handleModalClose, isModalOpened } = useContext(ModalContext);
  const [level, setLevel] = useState(4);

  const handleLevelChange = (value: number) => () => setLevel(value);
  return (
    <>
      {isModalOpened && (
        <Modal handleClose={handleModalClose}>
          <S.ContentWrapper>
            <S.Heading>
              <S.HeadingTitle>월드컵 강수 고르기</S.HeadingTitle>
              <S.XContainer>
                <XButton onClick={handleModalClose} />
              </S.XContainer>
            </S.Heading>
            <S.Content>
              <S.RadioFieldContainer>
                {[4, 8, 16, 32, 64].map((v, i) => (
                  <RadioField
                    key={v}
                    id={`level${i}`}
                    name='level'
                    isChecked={level === v}
                    onChange={handleLevelChange(v)}
                    label={`${v}강`}
                    value={v}
                  />
                ))}
              </S.RadioFieldContainer>
              <S.BtnContainer>
                <Button
                  type='button'
                  size='medium'
                  color='white'
                  backgroundColor='secondary'
                  onClick={handleModalSubmit(level)}
                >
                  시작
                </Button>
                <Button
                  type='button'
                  size='medium'
                  color='white'
                  backgroundColor='gray'
                  onClick={handleModalClose}
                >
                  취소
                </Button>
              </S.BtnContainer>
            </S.Content>
          </S.ContentWrapper>
        </Modal>
      )}
    </>
  );
};

export default LevelModal;
