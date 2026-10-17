"use client";

import InteractiveGrid from "@/components/InteractiveGrid";
import { useTheme } from "@/contexts/ThemeContext";
import { projectsData } from "@/data/projects";
import { generatePattern } from "@/lib/pattern";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowRightLine, RiExternalLinkLine } from "react-icons/ri";

const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 5rem 1.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3.5rem 1rem 2rem;
  }
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
`;

const MainTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  line-height: 1.6;
  max-width: 680px;
  margin: 0 auto 2.5rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 3rem 1.5rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1rem 3.5rem;
  }
`;

const TagsFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 3rem;
`;

const TagButton = styled.button<{ active: boolean }>`
  background-color: ${({ theme, active }) =>
    active ? theme.text : "transparent"};
  color: ${({ theme, active }) => (active ? theme.body : theme.text)};
  border: 1px solid
    ${({ theme, active }) => (active ? theme.text : theme.border)};
  padding: 0.45rem 1.1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    ${({ active, theme }) =>
      !active &&
      `
      background-color: ${theme.border};
      border-color: ${theme.text};
    `}
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
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
  height: 160px;
  background-color: ${({ theme }) => theme.body};
  background-image: ${({ "data-pattern": pattern }) => pattern};
  background-size: 28px 28px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
`;

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
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;
`;

const CardBadge = styled.span`
  font-size: 0.75rem;
  font-family: var(--font-roboto-mono), monospace;
  opacity: 0.7;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
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
  font-size: 0.88rem;
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.98rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    max-width: 550px;
    margin: 0 auto;
  }
`;

const PrinciplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const PrincipleCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1.5rem;

  .num {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
    margin-bottom: 0.5rem;
    font-family: var(--font-roboto-mono), monospace;
  }

  h4 {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 0.4rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    line-height: 1.55;
    margin: 0;
  }
`;

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const lang = i18n.language.startsWith("ko") ? "ko" : "en";

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeTag === null) {
      return projectsData;
    }
    return projectsData.filter((project) => project.tags.includes(activeTag));
  }, [activeTag]);

  const patterns = useMemo(
    () => filteredProjects.map((project) => generatePattern(theme, project.id)),
    [filteredProjects, theme]
  );

  return (
    <PageContainer>
      <InteractiveGrid />

      {/* Hero */}
      <HeroSection>
        <Badge>{t("hero.badge", "Developer Infrastructure & Open Source")}</Badge>
        <MainTitle>{t("hero.title", "Developer Hub")}</MainTitle>
        <Subtitle>{t("hero.subtitle")}</Subtitle>
      </HeroSection>

      {/* Projects Gallery */}
      <Section id="projects">
        <TagsFilterContainer>
          <TagButton
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          >
            {t("hub.all", "All")}
          </TagButton>
          {allTags.map((tag) => (
            <TagButton
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </TagsFilterContainer>

        <GalleryGrid>
          {filteredProjects.map((project, index) => {
            const data = project[lang] || project.en;
            const isInternal = !project.isExternal;
            const targetHref = isInternal ? `/${lang}${project.href}` : project.href;

            const CardWrapper = isInternal ? Link : "a";
            const linkProps = isInternal
              ? { href: targetHref }
              : {
                  href: targetHref,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };

            return (
              <CardWrapper key={project.id} {...(linkProps as any)} style={{ textDecoration: "none" }}>
                <Card>
                  <Thumbnail data-pattern={patterns[index]} />
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
                        <span>{isInternal ? "Explore" : "View"}</span>
                        {isInternal ? (
                          <RiArrowRightLine />
                        ) : (
                          <RiExternalLinkLine style={{ opacity: 0.6 }} />
                        )}
                      </CardLink>
                    </CardFooter>
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </GalleryGrid>
      </Section>

      {/* Engineering Principles */}
      <Section id="principles">
        <SectionHeader>
          <h2>{t("hub.principles_title", "Engineering Principles")}</h2>
          <p>{t("hub.projects_subtitle")}</p>
        </SectionHeader>

        <PrinciplesGrid>
          <PrincipleCard>
            <div className="num">01</div>
            <h4>{t("hub.p1_title", "Zero Friction")}</h4>
            <p>{t("hub.p1_desc")}</p>
          </PrincipleCard>
          <PrincipleCard>
            <div className="num">02</div>
            <h4>{t("hub.p2_title", "Concurrency First")}</h4>
            <p>{t("hub.p2_desc")}</p>
          </PrincipleCard>
          <PrincipleCard>
            <div className="num">03</div>
            <h4>{t("hub.p3_title", "Resilient & Idempotent")}</h4>
            <p>{t("hub.p3_desc")}</p>
          </PrincipleCard>
          <PrincipleCard>
            <div className="num">04</div>
            <h4>{t("hub.p4_title", "Minimalist Curation")}</h4>
            <p>{t("hub.p4_desc")}</p>
          </PrincipleCard>
        </PrinciplesGrid>
      </Section>
    </PageContainer>
  );
}
