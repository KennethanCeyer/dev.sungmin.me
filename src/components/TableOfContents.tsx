"use client";

import styled from "@emotion/styled";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export type Heading = {
  level: number;
  text: string;
  slug: string;
};

const ToCContainer = styled.nav`
  max-height: 80vh;
  min-height: 60vh;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 1rem;
`;

const ToCList = styled.ul`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border-right: 2px solid ${({ theme }) => theme.border};
`;

const ProgressBar = styled.div`
  position: absolute;
  right: -2px;
  top: 0;
  width: 2px;
  background-color: ${({ theme }) => theme.text};
`;

const ToCItem = styled.li<{ level: number; active: boolean; passed: boolean }>`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  right: 0;
  padding: 5px 0;
  padding-right: ${({ level }) => 20 + (level - 2) * 15}px;
  margin: 0;

  &::before {
    content: "";
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, active, passed }) =>
      active || passed ? theme.text : theme.body};
    border: 2px solid
      ${({ theme, active, passed }) =>
        active || passed ? theme.text : theme.border};
    transition: all 0.2s ease;
  }

  &:hover::before {
    border-color: ${({ theme }) => theme.text};
  }
`;

const ToCLink = styled.a<{ active: boolean }>`
  display: block;
  text-align: right;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  font-size: 0.85rem;
  transition: all 0.2s ease;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    opacity: 1;
  }
`;

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeSlug, setActiveSlug] = useState(
    headings.length > 0 ? headings[0].slug : ""
  );
  const [progress, setProgress] = useState(0);
  const [layout, setLayout] = useState<{
    items: (Heading & { top: number })[];
    listHeight: number;
  }>({ items: [], listHeight: 0 });
  const containerRef = useRef<HTMLElement>(null);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const yOffset = -80; // Offset for sticky header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${slug}`);
    }
  };

  const filteredHeadings = useMemo(
    () => headings.filter((h) => h.level >= 2 && h.level <= 3),
    [headings]
  );

  useLayoutEffect(() => {
    const calculateLayout = () => {
      if (filteredHeadings.length === 0) {
        setLayout({ items: [], listHeight: 0 });
        return;
      }

      const MIN_ITEM_HEIGHT = 40;

      const containerHeight = containerRef.current?.clientHeight || 0;
      const headingElements = filteredHeadings
        .map((h) => document.getElementById(h.slug))
        .filter((el): el is HTMLElement => !!el);

      if (headingElements.length < 2) {
        const items = filteredHeadings.map((h, i) => ({
          ...h,
          top: i * MIN_ITEM_HEIGHT,
        }));
        setLayout({ items, listHeight: items.length * MIN_ITEM_HEIGHT });
        return;
      }

      const firstEl = headingElements[0];
      const lastEl = headingElements[headingElements.length - 1];
      const firstTop = firstEl.getBoundingClientRect().top + window.scrollY;
      const contentHeight =
        lastEl.getBoundingClientRect().top + window.scrollY - firstTop;

      if (contentHeight <= 0) {
        const items = filteredHeadings.map((h, i) => ({
          ...h,
          top: i * MIN_ITEM_HEIGHT,
        }));
        setLayout({ items, listHeight: items.length * MIN_ITEM_HEIGHT });
        return;
      }

      const scaleFactor = (containerHeight - MIN_ITEM_HEIGHT) / contentHeight;
      const newItems = filteredHeadings.map((h) => {
        const el = document.getElementById(h.slug);
        const top = el
          ? (el.getBoundingClientRect().top + window.scrollY - firstTop) *
            scaleFactor
          : 0;
        return { ...h, top };
      });

      for (let i = 1; i < newItems.length; i++) {
        newItems[i].top = Math.max(
          newItems[i].top,
          newItems[i - 1].top + MIN_ITEM_HEIGHT
        );
      }

      const requiredHeight =
        newItems.length > 0
          ? newItems[newItems.length - 1].top + MIN_ITEM_HEIGHT
          : 0;

      const finalListHeight = Math.max(containerHeight, requiredHeight);

      setLayout({ items: newItems, listHeight: finalListHeight });
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedCalculateLayout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateLayout, 100);
    };

    calculateLayout();

    window.addEventListener("resize", debouncedCalculateLayout);

    return () => {
      window.removeEventListener("resize", debouncedCalculateLayout);
      clearTimeout(timeoutId);
    };
  }, [filteredHeadings]);

  useEffect(() => {
    if (layout.items.length === 0) return;

    const handleScroll = () => {
      const offset = 120;
      const fromTop = window.scrollY + offset;

      let currentActiveSlug = "";
      for (const heading of layout.items) {
        const element = document.getElementById(heading.slug);
        if (
          element &&
          element.getBoundingClientRect().top + window.scrollY <= fromTop
        ) {
          currentActiveSlug = heading.slug;
        }
      }

      // If at the bottom of the page, highlight the last item
      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50
      ) {
        if (layout.items.length > 0) {
          currentActiveSlug = layout.items[layout.items.length - 1].slug;
        }
      }

      setActiveSlug(
        currentActiveSlug ||
          (layout.items.length > 0 ? layout.items[0].slug : "")
      );

      const activeIndex = layout.items.findIndex(
        (h) => h.slug === currentActiveSlug
      );
      const currentItem = layout.items[activeIndex];
      const nextItem = layout.items[activeIndex + 1];

      if (!currentItem) {
        setProgress(0);
        return;
      }

      const contentEndMarker = document.getElementById("post-footer-container");
      const currentEl = document.getElementById(currentItem.slug);
      const nextEl = nextItem
        ? document.getElementById(nextItem.slug)
        : contentEndMarker;

      if (!currentEl || !nextEl) {
        setProgress(currentItem.top);
        return;
      }

      const currentSectionStart =
        currentEl.getBoundingClientRect().top + window.scrollY;
      const currentSectionEnd =
        nextEl.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = currentSectionEnd - currentSectionStart;
      const currentSectionProgress = fromTop - currentSectionStart;

      const ratio =
        sectionHeight > 0
          ? Math.max(0, Math.min(1, currentSectionProgress / sectionHeight))
          : 0;

      const tocItemStart = currentItem.top;
      const tocItemEnd = nextItem ? nextItem.top : layout.listHeight;
      const tocItemHeight = tocItemEnd - tocItemStart;

      const BULLET_OFFSET = 12;
      const progressHeight =
        tocItemStart + ratio * tocItemHeight + BULLET_OFFSET;
      setProgress(Math.min(progressHeight, layout.listHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [layout]);

  const activeIndex = layout.items.findIndex((h) => h.slug === activeSlug);

  return (
    <ToCContainer ref={containerRef} aria-label="Table of Contents">
      <ToCList style={{ height: `${Math.max(layout.listHeight, 1)}px` }}>
        <ProgressBar style={{ height: `${progress}px` }} />
        {layout.items.map(({ slug, text, level, top }, index) => (
          <ToCItem
            key={slug}
            level={level}
            active={slug === activeSlug}
            passed={index < activeIndex}
            style={{ top: `${top}px` }}
          >
            <ToCLink
              href={`#${slug}`}
              active={slug === activeSlug}
              onClick={(e) => handleLinkClick(e, slug)}
            >
              {text}
            </ToCLink>
          </ToCItem>
        ))}
      </ToCList>
    </ToCContainer>
  );
}
