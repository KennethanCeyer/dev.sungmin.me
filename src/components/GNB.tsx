"use client";

import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const linkStyles = (theme: Theme) => css`
  font-size: 0.95rem;
  font-weight: 400;
  color: ${theme.text};
  opacity: 0.7;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;
  position: relative;
  padding: 0.25rem 0;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${theme.text};
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    opacity: 1;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ "data-active": boolean }>`
  ${({ theme }) => linkStyles(theme)}

  &:hover::after,
  &[data-active="true"]::after {
    width: 100%;
  }

  &[data-active="true"] {
    opacity: 1;
    font-weight: 600;
  }
`;

const ExternalLink = styled.a`
  ${({ theme }) => linkStyles(theme)}

  &:hover::after {
    width: 100%;
  }
`;

const GNB: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links: {
    href: string;
    label: string;
    isExternal?: boolean;
    isActiveMatch?: string;
  }[] = [
    {
      href: `/${lang}#projects`,
      label: t("nav.projects", "Projects"),
      isActiveMatch: `/${lang}#projects`,
    },
    {
      href: `/${lang}#principles`,
      label: t("nav.principles", "Principles"),
    },
    {
      href: "https://blog.sungmin.me",
      label: "Blog",
      isExternal: true,
    },
    {
      href: "https://github.com/KennethanCeyer",
      label: "GitHub",
      isExternal: true,
    },
    {
      href: "https://sungmin.me",
      label: "Profile",
      isExternal: true,
    },
  ];

  return (
    <Nav>
      {links.map((link) =>
        link.isExternal ? (
          <ExternalLink
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </ExternalLink>
        ) : (
          <NavLink
            key={link.href}
            href={link.href}
            data-active={
              link.isActiveMatch ? pathname === link.isActiveMatch : false
            }
          >
            {link.label}
          </NavLink>
        )
      )}
    </Nav>
  );
};

export default GNB;
