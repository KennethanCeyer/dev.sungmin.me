"use client";

import Logo from "@/assets/images/logo.png";
import GNB from "@/components/GNB";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileMenu from "@/components/MobileMenu";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RiMenuFill } from "react-icons/ri";

const HeaderContainer = styled.header<{ isHidden: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  background-color: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.borderMuted || theme.border};
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.25s ease;
  transform: ${({ isHidden }) => (isHidden ? "translateY(-100%)" : "translateY(0)")};
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  pointer-events: ${({ isHidden }) => (isHidden ? "none" : "auto")};
`;

const HeaderInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const DevBadge = styled.span`
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  letter-spacing: 0.04em;
  opacity: 0.85;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const Header: React.FC<{ lang: string }> = ({ lang }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 30;

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (Math.abs(delta) < scrollThreshold) {
        return;
      }

      if (current < 80) {
        setIsHidden(false);
      } else if (delta > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeaderContainer isHidden={isHidden}>
        <HeaderInner>
          <LogoContainer>
            <LogoLink href={`/${lang}`} aria-label="Dev Sungmin Home">
              <Image height={38} src={Logo} alt="sungmin.me" priority />
              <DevBadge>DEV</DevBadge>
            </LogoLink>
          </LogoContainer>

          <RightSection>
            <GNB lang={lang} />
            <LanguageSwitcher lang={lang} />
            <ThemeSwitcher />
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <RiMenuFill />
            </MobileMenuButton>
          </RightSection>
        </HeaderInner>
      </HeaderContainer>

      <MobileMenu
        lang={lang}
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
