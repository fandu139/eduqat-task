import { styled } from "styled-components";
import * as styles from "./styles";

/* concat styles based on props */
const ButtonBase = styled.button`
  ${styles.buttonbase};
  ${(props) => styles[props.size]};
  ${(props) => styles[props.variant]};
`;

const Button = ({ size, variant, ...rest }) => (
  <ButtonBase size={size} variant={variant} {...rest} />
);

export default Button;
