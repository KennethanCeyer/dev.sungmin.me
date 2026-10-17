"use client";

import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine, RiGlobalLine } from "react-icons/ri";

const SwitcherContainer = styled.div`
  position: relative;
  font-size: 0.9rem;
  font-weight: 400;
`;

const CurrentLang = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.85rem;
  font-family: inherit;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.text};
  }

  svg:last-of-type {
    transition: transform 0.2s ease-in-out;
  }
  &.open svg:last-of-type {
    transform: rotate(180deg);
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  padding: 0.4rem 0;
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  list-style: none;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 110px;
  overflow: hidden;
`;

const DropdownItem = styled.li`
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: 400;
  font-family: inherit;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    opacity: 1;
  }

  &.active {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    opacity: 1;
  }
`;

const LanguageSwitcher: React.FC<{ lang: string }> = ({ lang }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language || lang || "ko").substring(0, 2).toLowerCase();

  const changeLanguage = (newLang: string) => {
    const segments = pathname.split("/");
    let newPath: string;

    if (segments[1] === "ko" || segments[1] === "en") {
      segments[1] = newLang;
      newPath = segments.join("/");
    } else {
      newPath = `/${newLang}${pathname}`;
    }

    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SwitcherContainer ref={containerRef}>
      <CurrentLang
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "open" : ""}
        aria-label="Switch Language"
      >
        <RiGlobalLine style={{ fontSize: "1rem" }} />
        <span>{currentLang.toUpperCase()}</span>
        <RiArrowDownSLine />
      </CurrentLang>
      {isOpen && (
        <Dropdown>
          <DropdownItem
            onClick={() => changeLanguage("en")}
            className={currentLang === "en" ? "active" : ""}
          >
            English (EN)
          </DropdownItem>
          <DropdownItem
            onClick={() => changeLanguage("ko")}
            className={currentLang === "ko" ? "active" : ""}
          >
            한국어 (KO)
          </DropdownItem>
        </Dropdown>
      )}
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
