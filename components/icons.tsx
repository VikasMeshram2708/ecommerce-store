import { LucideIcon, LucideProps } from "lucide-react";
import { ShoppingBag, Star, ChevronDown } from "lucide-react";

interface IconProps extends LucideProps {
  // You can add any additional props your icons might need
}

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  shoppingBag: (props: IconProps) => <ShoppingBag {...props} />,
  star: (props: IconProps) => <Star {...props} />,
  chevronDown: (props: IconProps) => <ChevronDown {...props} />,
};
