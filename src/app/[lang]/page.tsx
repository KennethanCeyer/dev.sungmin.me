"use client";

import InteractiveGrid from "@/components/InteractiveGrid";
import styled from "@emotion/styled";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  RiAppleFill,
  RiArrowRightLine,
  RiCodeBoxLine,
  RiCpuLine,
  RiCupLine,
  RiExternalLinkLine,
  RiFlashlightFill,
  RiGithubFill,
  RiGlobalLine,
  RiLayoutMasonryLine,
  RiShieldCheckLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 5.5rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3.5rem 1rem 2.5rem;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: rgba(var(--pattern-rgb), 0.05);
  border: 1px solid var(--color-border-weak);
  margin-bottom: 1.5rem;
  color: var(--accent-color, #00add8);
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
  line-height: 1.15;

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
`;

const GradientSpan = styled.span`
  background: var(--accent-gradient, linear-gradient(135deg, #00add8, #007d9c));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 720px;
  margin: 0 auto 2.5rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryLink = styled(Link)`
  background: var(--accent-gradient, #00add8);
  color: #ffffff;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const SecondaryLink = styled.a`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 4.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
    border: none;
    padding: 0;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeaturedCard = styled.div`
  background: ${({ theme }) => theme.body};
  border: 1px solid var(--accent-color, #00add8);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 173, 216, 0.08);
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 1.75rem;
  }

  .glow {
    position: absolute;
    top: -80px;
    right: -80px;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(0, 173, 216, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .badge-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #ffffff;
    background: var(--accent-gradient, #00add8);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    max-width: 750px;
    margin: 0 0 1.5rem;
    line-height: 1.65;
  }
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.text};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 1.8rem;
    color: var(--accent-color, ${({ theme }) => theme.primary});
  }

  .category {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    line-height: 1.6;
    margin: 0 0 1.5rem;
    flex-grow: 1;
  }

  .link {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-color, #00add8);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: gap 0.2s ease;

    &:hover {
      gap: 0.55rem;
    }
  }
`;

const PrinciplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const PrincipleCard = styled.div`
  background-color: var(--color-background);
  border: 1px solid var(--color-border-weak);
  border-radius: 10px;
  padding: 1.5rem;

  .num {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent-color, #00add8);
    margin-bottom: 0.5rem;
    font-family: var(--font-roboto-mono), monospace;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.4rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    line-height: 1.55;
    margin: 0;
  }
`;

export default function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <InteractiveGrid />

      {/* Hero */}
      <HeroSection>
        <Badge>
          <RiFlashlightFill />
          <span>{t("hero.badge", "Developer Tools & Open Source")}</span>
        </Badge>
        <MainTitle>
          Building Tools for <GradientSpan>Developers</GradientSpan>
        </MainTitle>
        <Subtitle>{t("hero.subtitle")}</Subtitle>

        <HeroActions>
          <PrimaryLink href="/coffee-bun">
            <RiCupLine />
            <span>{t("hero.explore_bundle", "Explore coffee-bun")}</span>
          </PrimaryLink>
          <SecondaryLink href="#projects">
            <RiCodeBoxLine />
            <span>{t("hero.all_projects", "Browse Projects")}</span>
          </SecondaryLink>
          <SecondaryLink
            href="https://github.com/KennethanCeyer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiGithubFill />
            <span>GitHub Profile</span>
            <RiExternalLinkLine style={{ opacity: 0.6 }} />
          </SecondaryLink>
        </HeroActions>
      </HeroSection>

      {/* Featured Showcase: coffee-bun */}
      <Section id="featured">
        <FeaturedCard>
          <div className="glow" />
          <div className="badge-tag">⭐ Featured Open-Source • CLI: bun</div>
          <h3>☕ coffee-bun — macOS MacBook Setup & Maintenance</h3>
          <p>
            {t(
              "coffee_bun.description",
              "Zero to fully configured dev environment in one shot with the `bun` CLI. Installs Oh My Zsh, Powerlevel10k, Dev Runtimes (Go, Node, Python), Modern CLI utilities, and Essential Apps with automatic symlinks."
            )}
          </p>

          <CardActions>
            <PrimaryLink href="/coffee-bun">
              <span>Launch coffee-bun Showcase</span>
              <RiArrowRightLine />
            </PrimaryLink>
            <SecondaryLink
              href="https://github.com/KennethanCeyer/coffee-bun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiGithubFill />
              <span>GitHub (KennethanCeyer/coffee-bun)</span>
              <RiExternalLinkLine style={{ opacity: 0.6 }} />
            </SecondaryLink>
          </CardActions>
        </FeaturedCard>

        {/* Curated Projects Section */}
        <div id="projects">
          <SectionHeader>
            <h2>{t("hub.projects_title", "Featured Engineering Projects")}</h2>
            <p>{t("hub.projects_subtitle")}</p>
          </SectionHeader>

          <ProjectsGrid>
            <ProjectCard>
              <div className="card-top">
                <span className="icon">☕</span>
                <span className="category">CLI & System Tool (bun)</span>
              </div>
              <h3>coffee-bun</h3>
              <p>
                Automated macOS MacBook Setup & Maintenance Tool written in Go.
                Run <code>bun</code> to concurrently configure shell, runtimes, and apps in one shot.
              </p>
              <Link className="link" href="/coffee-bun">
                <span>View coffee-bun landing</span>
                <RiArrowRightLine />
              </Link>
            </ProjectCard>

            <ProjectCard>
              <div className="card-top">
                <span className="icon">
                  <RiLayoutMasonryLine />
                </span>
                <span className="category">Design & Code Engine</span>
              </div>
              <h3>Grida</h3>
              <p>
                Open-source design-to-code technology, canvas engine, and UI
                automation platform. Bridging design and engineering.
              </p>
              <a
                className="link"
                href="https://github.com/gridaco"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Visit grida.co</span>
                <RiExternalLinkLine />
              </a>
            </ProjectCard>

            <ProjectCard>
              <div className="card-top">
                <span className="icon">
                  <RiCpuLine />
                </span>
                <span className="category">Go & MLOps</span>
              </div>
              <h3>Golang & Cloud Infrastructure</h3>
              <p>
                GDG Golang Korea Lead & Google Developer Expert (ML/Cloud).
                Open-source libraries and enterprise architectures.
              </p>
              <a
                className="link"
                href="https://sungmin.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Read Biography</span>
                <RiExternalLinkLine />
              </a>
            </ProjectCard>
          </ProjectsGrid>
        </div>
      </Section>

      {/* Engineering Principles */}
      <Section id="principles">
        <SectionHeader>
          <h2>{t("hub.principles_title", "Engineering Principles")}</h2>
          <p>The core values baked into every tool and library built here.</p>
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
            <h4>{t("hub.p4_title", "Thoughtful Minimalism")}</h4>
            <p>{t("hub.p4_desc")}</p>
          </PrincipleCard>
        </PrinciplesGrid>
      </Section>
    </PageContainer>
  );
}
