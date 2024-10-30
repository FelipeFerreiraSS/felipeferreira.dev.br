import { ReactNode } from "react";
import { LoadingSpinner } from "./loadingSpinner";

type SubmitButtonProps = {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void; 
  children: ReactNode; 
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { isLoading, disabled, onClick, children } = props
  return (
    <button
      type="submit"
      className={`${isLoading || disabled ? ' bg-black' : 'bg-blue-500'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} text-white py-2 px-4 rounded`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {<div className="flex">
        {children} {isLoading ? <LoadingSpinner /> : null}  
      </div>}
    </button>
  );
};
