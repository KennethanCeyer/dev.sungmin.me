"use client";

import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import {
  RiGithubLine,
  RiLinkedinLine,
  RiMapPinUserLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "react-icons/ri";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.body};
  padding: 2.5rem 1rem;
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.25s ease, color 0.25s ease,
    border-color 0.25s ease;
  margin-top: auto;
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1.5rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.7;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  a {
    color: ${({ theme }) => theme.text};
    font-size: 1.35rem;
    opacity: 0.7;
    transition: opacity 0.2s ease, transform 0.2s ease;

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
    }
  }
`;

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Profile",
      href: "https://sungmin.me/",
      icon: <RiMapPinUserLine />,
    },
    {
      name: "GitHub",
      href: "https://github.com/kennethanceyer",
      icon: <RiGithubLine />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sungmin-han-768419133/",
      icon: <RiLinkedinLine />,
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/kenneth_han",
      icon: <RiTwitterXLine />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@kenneth-han",
      icon: <RiYoutubeLine />,
    },
  ];

  return (
    <FooterContainer>
      <FooterInner>
        <Copyright>
          © {new Date().getFullYear()} {t("footer.copyright", "Sungmin Han. All rights reserved.")}
        </Copyright>

        <SocialLinks>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </SocialLinks>
      </FooterInner>
    </FooterContainer>
  );
}
