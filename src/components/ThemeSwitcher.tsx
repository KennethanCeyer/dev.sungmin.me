"use client";

import { useTheme } from "@/contexts/ThemeContext";
import styled from "@emotion/styled";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const SwitcherButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 0.55rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.text};
  }
`;

const ThemeSwitcher = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <SwitcherButton aria-label="Toggle theme" style={{ opacity: 0 }} />;
  }

  return (
    <SwitcherButton onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? <RiMoonFill /> : <RiSunFill />}
    </SwitcherButton>
  );
};

export default ThemeSwitcher;
