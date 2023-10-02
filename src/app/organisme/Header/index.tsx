import Image from 'next/image'
import { styled } from "styled-components";
import IconArrowLeft from "@/assets/icons/arrow-left.svg";

import Text from "@/app/atom/Text";

interface NavProps {
  height: string;
}

const StyledHeader = styled.nav<NavProps>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px #e0dddd;
  background-color: ${({ theme }) => theme.colors.white};
  padding-left: 50px;
`;

interface HeaderProps {
  title: string;
  height: string;
}

const Header = ({ title, height }: HeaderProps) => {
  return (
    <StyledHeader height={height}>
      <Image
        src={IconArrowLeft}
        alt="Icon Arrow Left"
        className="dark:invert"
        width={40}
        height={24}
        priority
      />
      <Text size="lg" weight="bold">
        {title}
      </Text>
    </StyledHeader>
  );
};

export default Header;
