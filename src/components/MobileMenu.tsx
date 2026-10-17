"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { RiCloseLine, RiExternalLinkLine } from "react-icons/ri";

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const MenuDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 320px;
  background-color: ${({ theme }) => theme.body};
  border-left: 1px solid ${({ theme }) => theme.border};
  z-index: 101;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const DrawerTitle = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const NavItem = styled.li`
  a {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    transition: color 0.2s ease;

    &:hover {
      color: var(--accent-color, ${({ theme }) => theme.primary});
    }
  }
`;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  lang,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: t("nav.dev_home", "Dev Portal") },
    { href: `/${lang}/bundle`, label: "⚡ bundle" },
    { href: `/${lang}#projects`, label: t("hub.projects_title", "Projects") },
    {
      href: "https://github.com/KennethanCeyer/bundle",
      label: "bundle GitHub",
      isExternal: true,
    },
    {
      href: "https://blog.sungmin.me",
      label: "Blog",
      isExternal: true,
    },
    {
      href: "https://sungmin.me",
      label: "Profile",
      isExternal: true,
    },
  ];

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <MenuDrawer isOpen={isOpen}>
        <DrawerHeader>
          <DrawerTitle>dev.sungmin.me</DrawerTitle>
          <CloseButton onClick={onClose} aria-label="Close menu">
            <RiCloseLine />
          </CloseButton>
        </DrawerHeader>
        <NavLinksList>
          {links.map((link) => (
            <NavItem key={link.href}>
              {link.isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  <span>{link.label}</span>
                  <RiExternalLinkLine style={{ opacity: 0.6 }} />
                </a>
              ) : (
                <Link href={link.href} onClick={onClose}>
                  <span>{link.label}</span>
                </Link>
              )}
            </NavItem>
          ))}
        </NavLinksList>
      </MenuDrawer>
    </>
  );
}
