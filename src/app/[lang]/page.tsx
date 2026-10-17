"use client";

import DevBackground from "@/components/DevBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { projectsData } from "@/data/projects";
import { generatePattern } from "@/lib/pattern";
import styled from "@emotion/styled";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowRightLine } from "react-icons/ri";

const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6.5rem 1.5rem 4.5rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4.5rem 1rem 3rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  pointer-events: none;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: var(--font-roboto-mono), monospace;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  opacity: 0.85;
  margin-bottom: 1.25rem;
  pointer-events: auto;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;
  pointer-events: auto;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  line-height: 1.6;
  max-width: 680px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  pointer-events: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 3.5rem 40px 6rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2.5rem 20px 4rem;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.4rem;
    letter-spacing: -0.02em;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.text};
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  }
`;

const Thumbnail = styled.div<{ "data-pattern": string }>`
  height: 190px;
  background-color: ${({ theme }) => theme.body};
  background-image: ${({ "data-pattern": pattern }) => pattern};
  background-size: 28px 28px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: hidden;
`;

const ThumbnailAscii = styled.pre`
  margin: 0;
  padding: 0.75rem 1.15rem;
  font-family: var(--font-roboto-mono), monospace;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  font-size: 0.72rem;
  line-height: 1.18;
  letter-spacing: 0;
  white-space: pre;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 0.52rem;
    padding: 0.55rem 0.75rem;
  }
`;

const COFFEE_BUN_ASCII = [
  "      ▄▄██████▄▄         ▄▀▀▀ ▄▀▀▄ █▀▀▀ █▀▀▀ █▀▀▀ █▀▀▀",
  "   ▄██▀▀▀▀▀▀▀▀▀▀██▄      █    █  █ █▀▀  █▀▀  █▀▀  █▀▀ ",
  "  ██▀ ▄▄██████▄▄ ▀██     ▀▄▄▄ ▀▄▄▀ ▀    ▀    ▀▄▄▄ ▀▄▄▄",
  " ██▀ ██▀▀▀▀▀▀▀▀██ ▀██    █▀▀▄ █  █ █▄ █",
  "▄██▄▄████████████▄▄██▄   █▀▀▄ █  █ █ ▀█",
  " ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀    ▀▀▀   ▀▀  ▀  ▀",
].join("\n");

const CardContent = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;
`;

const CardBadge = styled.span`
  font-size: 0.78rem;
  font-family: var(--font-roboto-mono), monospace;
  opacity: 0.7;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
`;

const CardDescription = styled.p`
  font-size: 0.98rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: var(--font-roboto-mono), monospace;
  opacity: 0.8;
`;

const CardLink = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  opacity: 0.9;
  transition: gap 0.2s ease, opacity 0.2s ease;

  ${Card}:hover & {
    gap: 0.55rem;
    opacity: 1;
  }
`;

export default function HomePage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const params = useParams();
  const urlLang = typeof params?.lang === "string" ? params.lang : "en";
  const lang = urlLang.startsWith("ko") ? "ko" : "en";

  const patterns = useMemo(
    () => projectsData.map((project) => generatePattern(theme, project.id)),
    [theme]
  );

  return (
    <PageContainer>
      {/* Hero */}
      <HeroSection>
        <DevBackground />
        <HeroContent>
          <Badge>{t("hero.badge", "Developer Infrastructure & Open Source")}</Badge>
          <MainTitle>{t("hero.title", "Developer Hub")}</MainTitle>
          <Subtitle>{t("hero.subtitle")}</Subtitle>
        </HeroContent>
      </HeroSection>

      {/* Projects Gallery (Only coffee-bun) */}
      <Section id="projects">
        <SectionHeader>
          <h2>{t("hub.projects_title", "Projects")}</h2>
          <p>{t("hub.projects_subtitle", "Developer tools and open-source software.")}</p>
        </SectionHeader>

        <GalleryGrid>
          {projectsData.map((project, index) => {
            const data = project[lang] || project.en;
            const targetHref = `/${lang}${project.href}`;

            return (
              <Link
                key={project.id}
                href={targetHref}
                style={{ textDecoration: "none" }}
              >
                <Card>
                  <Thumbnail data-pattern={patterns[index]}>
                    {project.id === "coffee-bun" && (
                      <ThumbnailAscii aria-hidden="true">
                        {COFFEE_BUN_ASCII}
                      </ThumbnailAscii>
                    )}
                  </Thumbnail>
                  <CardContent>
                    <CardHeader>
                      <CardTitle>{data.title}</CardTitle>
                      {data.badge && <CardBadge>{data.badge}</CardBadge>}
                    </CardHeader>
                    <CardDescription>{data.description}</CardDescription>
                    <CardFooter>
                      <TagsContainer>
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagsContainer>
                      <CardLink>
                        <span>{t("hub.explore", "Explore")}</span>
                        <RiArrowRightLine />
                      </CardLink>
                    </CardFooter>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </GalleryGrid>
      </Section>
    </PageContainer>
  );
}
