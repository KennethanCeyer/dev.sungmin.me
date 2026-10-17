"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import I18nProvider from "@/components/I18nProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GlobalStyles from "@/styles/GlobalStyles";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex-grow: 1;
  position: relative;
  z-index: 1;
`;

export default function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <I18nProvider lang={lang}>
      <ThemeProvider>
        <GlobalStyles />
        <PageContainer>
          <Header lang={lang} />
          <MainContent>{children}</MainContent>
          <Footer />
        </PageContainer>
      </ThemeProvider>
    </I18nProvider>
  );
}
