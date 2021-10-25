import { useFormikContext } from "formik";
import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HelperText from "../../common/HelperText";
import Input from "../../common/Input";
import Text from "../../common/Text";

const DropDown = styled.ul<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  /* transform: translateY(-3px); */
  border: 2px solid black;
  border-top: none;
  width: 100%;
  z-index: 1000;
  background-color: #fff;

  & > li {
    padding: 0 0.5rem;
    &:not(&:last-child) {
      border-bottom: 1px solid black;
    }
    &:focus {
      background-color: rgba(1, 1, 1, 0.3);
      outline: none;
    }
    &:hover {
      background-color: rgba(1, 1, 1, 0.3);
    }
  }
`;

interface EmailHost {
  value: string;
  id: number;
  ref: React.RefObject<HTMLLIElement>;
}
const emailHosts: EmailHost[] = [
  { value: "naver.com", id: 1, ref: createRef<HTMLLIElement>() },
  { value: "google.com", id: 2, ref: createRef<HTMLLIElement>() },
  { value: "daum.net", id: 3, ref: createRef<HTMLLIElement>() },
  { value: "hotmail.com", id: 4, ref: createRef<HTMLLIElement>() },
  { value: "kakao.com", id: 5, ref: createRef<HTMLLIElement>() },
];

const EmailField = () => {
  const { setFieldValue, values, touched, errors, handleChange, handleBlur } =
    useFormikContext<SignUpFormValues>();
  const [filteredHosts, setFilteredHosts] = useState(emailHosts);
  const [currentLiEl, setCurrentLiEl] = useState<React.RefObject<HTMLLIElement> | null>(null);
  const [showHostLists, setShowHostLists] = useState(false);
  const emailHostInputEl = useRef<HTMLInputElement>(null);
  const emailInputEl = useRef<HTMLInputElement>(null);

  const handleEmailHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFieldValue("emailHost", value);
    setFilteredHosts(emailHosts.filter((host) => host.value.includes(value)));
  };

  const handleEmailHostBlur = () => {
    setShowHostLists(false);
  };

  const handleEmailHostFocus = () => {
    setShowHostLists(true);
  };

  const handleEmailHostClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.textContent || "";
    setFieldValue("emailHost", value);
    handleEmailHostBlur();
  };

  const handleEmailHostKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const hostLength = filteredHosts.length;
      if (!hostLength) return;
      setShowHostLists(true);
      if (e.key === "ArrowDown") {
        if (currentLiEl?.current === null) {
          setCurrentLiEl(filteredHosts[0].ref);
        } else {
          for (let i = 0; i < hostLength; i += 1) {
            if (filteredHosts[i].ref === currentLiEl) {
              if (i !== hostLength - 1) setCurrentLiEl(filteredHosts[i + 1].ref);
              else {
                setCurrentLiEl(null);
                emailHostInputEl.current?.focus();
              }
            }
          }
        }
      } else if (e.key === "ArrowUp") {
        if (currentLiEl?.current == null) {
          setCurrentLiEl(filteredHosts[hostLength - 1].ref);
        } else {
          for (let i = hostLength - 1; i >= 0; i -= 1) {
            if (filteredHosts[i].ref === currentLiEl) {
              if (i !== 0) setCurrentLiEl(filteredHosts[i - 1].ref);
              else {
                setCurrentLiEl(null);
                emailHostInputEl.current?.focus();
              }
            }
          }
        }
      } else if (e.key === "Enter" || e.key === "Escape") {
        if (currentLiEl?.current) setFieldValue("emailHost", currentLiEl.current.textContent || "");
        handleEmailHostBlur();
      }
    },
    [currentLiEl, filteredHosts, setFieldValue],
  );

  useEffect(() => {
    if (currentLiEl?.current) currentLiEl.current.focus();
  }, [currentLiEl]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      handleEmailHostBlur();
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [emailHostInputEl.current?.value]);

  useEffect(() => {
    emailInputEl.current?.focus();
  }, []);
  return (
    <>
      <Text bold fontSize='strongBody' text='이메일' />
      <Input
        ref={emailInputEl}
        autoComplete='off'
        value={values.email}
        name='email'
        onChange={handleChange}
        onBlur={handleBlur}
        width='15rem'
        type='text'
        tabIndex={0}
      />
      <Text margin='0 .5rem' bold fontSize='strongBody' text='@' />
      <div role='presentation' onKeyDown={handleEmailHostKeyDown} style={{ position: "relative" }}>
        <Input
          ref={emailHostInputEl}
          autoComplete='off'
          value={values.emailHost}
          name='emailHost'
          onChange={handleEmailHostChange}
          onFocus={handleEmailHostFocus}
          width='15rem'
          type='text'
          tabIndex={0}
        />
        <DropDown visible={showHostLists && Boolean(filteredHosts.length)}>
          {filteredHosts.map((host) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={handleEmailHostClick}
              onKeyDown={() => {}}
              ref={host.ref}
              tabIndex={-1}
              key={host.id}
            >
              {host.value}
            </li>
          ))}
        </DropDown>
      </div>
      <HelperText
        hasError={Boolean(touched.email && errors.email)}
        text={(touched.email && (errors.email || "가능한 이메일입니다")) as string}
      />
    </>
  );
};

export default EmailField;

// TODO: REFACTOR!!!!!!!!!
