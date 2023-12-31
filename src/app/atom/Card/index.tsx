import { ReactNode } from "react";

interface CardProps {
  children: ReactNode
  padding?: number;
  margin?: string;
}

const Card = ({ children, padding = 4, margin = '', ...props } : CardProps) => {
  return (
    <div
      {...props}
      className={`border rounded p-${padding} ${margin}`}
    >
      {children}
    </div>
  )
}

export default Card;
