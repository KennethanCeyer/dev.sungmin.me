"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

export interface PreviewData {
  title?: string;
  description?: string;
  url: string;
  image?: string;
  type?: "github" | "general";
  error?: boolean;
}

const PagePreviewContainer = styled.a`
  display: flex;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  margin: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  transition: background-color 0.2s ease, border-color 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.body};
  }

  .content {
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
    flex: 1;
  }

  .title {
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    border: none;
  }

  .description {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0.5rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.7rem;
    line-height: 1.5;
  }

  .url-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .url-icon {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    object-fit: contain;
  }

  .url-text {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PagePreviewCard: React.FC<{ data: PreviewData }> = ({ data }) => {
  const defaultIcon = "/favicon.ico";

  return (
    <PagePreviewContainer
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="content">
        <h4 className="title">{data.title || data.url}</h4>
        <p className="description">
          {data.description || "No description available."}
        </p>
        <div className="url-container">
          <Image
            className="url-icon"
            src={
              data.image && data.type === "github" ? data.image : defaultIcon
            }
            alt="icon"
            width={16}
            height={16}
          />
          <span className="url-text">{data.url}</span>
        </div>
      </div>
      {data.image && data.type !== "github" && (
        <div style={{ position: "relative", width: 120, minWidth: 120 }}>
          <Image
            src={data.image}
            alt="preview"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </PagePreviewContainer>
  );
};

export default PagePreviewCard;
