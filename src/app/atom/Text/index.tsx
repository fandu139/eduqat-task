import { styled } from "styled-components";

interface SpanProps {
  theme?: {
    colors: {
      white: string;
      black: string;
      primary: string;
      gray: string;
    },
    fontSize: {
      sm: string;
      md: string;
      default: string;
      lg: string;
      xl: string;
    },
  };
  color?: 'white' | 'black' | 'primary' | 'gray';
  size?: 'sm' | 'md' | 'default' | 'lg' | 'xl';
  weight?: string;
  ml?: string;
  mr?: string;
  p?: string;
  bdwidth?: string;
  bdstyle?: string;
  bdcolor?: 'white' | 'black' | 'primary' | 'gray';
}

const Text = styled.span<SpanProps>`
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.black};
  font-size: ${({ theme, size }) => size ? theme.fontSize[size] : theme.fontSize.default};
  font-weight: ${({ weight }) => weight || "normal"};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  padding: ${({ p }) => p || "0"};
  border-width: ${({ bdwidth }) => bdwidth || "0"};
  border-style: ${({ bdstyle }) => bdstyle || "none"};
  border-color: ${({ theme, bdcolor }) => bdcolor ? theme.colors[bdcolor] : "none"};
`;

export default Text;
