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
      className={`${isLoading || disabled ? ' bg-black' : 'bg-blue-600'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600 py-2 px-4 rounded`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {<div className="flex">
        {children} {isLoading ? <LoadingSpinner /> : null}  
      </div>}
    </button>
  );
};
