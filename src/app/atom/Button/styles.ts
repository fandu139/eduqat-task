import { css } from "styled-components";

/* styles common to all buttons */
export const buttonbase = css`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border: none;
  background-color: ${({ theme, color }) =>
    theme.colors[color] || theme.colors.white};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.DEFAULT};
  padding: 10px 14px;
  border-radius: 8px;

  &:hover {
    filter: brightness(96%);
  }

  &:disabled {
    filter: grayscale(80%);
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.gray_200} !important;
  }
`;

/* theme variants */
export const contained = css`
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    filter: brightness(80%);
  }
`;
export const outlined = css`
  font-weight: normal;
  border: 1px solid
    ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    filter: brightness(120%);
  }
`;

/* size variants */
export const small = css`
  padding: 4px !important;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
export const large = css`
  padding: 12px 22px !important;
  border-radius: 8px;
`;
