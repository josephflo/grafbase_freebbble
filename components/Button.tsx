import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
  title: string;
  type?: "button" | "submit";
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
  isSubmitting?: boolean;
};

const Button = ({
  title,
  type,
  leftIcon,
  rightIcon,
  handleClick,
  bgColor,
  textColor,
  isSubmitting,
}: Props) => {
  return (
    <button
      title={title}
      type={type || "button"}
      disabled={isSubmitting}
      onClick={handleClick}
      className={`flexCenter gap-3 px-4 py-3 
      ${textColor ? textColor : 'text-white'} 
      ${isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left-icon" />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right-icon" />
      )}
    </button>
  );
};

export default Button;
