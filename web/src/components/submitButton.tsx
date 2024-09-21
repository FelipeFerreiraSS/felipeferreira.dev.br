import { ReactNode } from "react";
import { LoadingSpinner } from "./loadingSpinner";

type SubmitButtonProps = {
  isLoading: boolean;
  onClick?: () => void; 
  children: ReactNode; 
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { isLoading, onClick, children } = props
  return (
    <button
      type="submit"
      className={`${isLoading ? 'cursor-no-drop bg-black' : 'bg-blue-500'} text-white py-2 px-4 rounded`}
      onClick={onClick}
      disabled={isLoading}
    >
      {<div className="flex">
        {children} {isLoading ? <LoadingSpinner /> : null}  
      </div>}
    </button>
  );
};
