"use client";

import { ThemeProvider } from "styled-components";
import { theme } from '@/theme/theme';

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
};
