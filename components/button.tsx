import React from 'react';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    classNames: string;
}

export default function Button({ onClick, children, classNames }: ButtonProps) {
    return (
        <a
            onClick={onClick}
            className={["group cursor-pointer flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-500 focus:outline-none focus:ring active:bg-indigo-500", classNames].join(' ')}
        >
      <span className="font-medium transition-colors flex justify-center items-center w-full group-hover:text-white">
        {children}
      </span>
        </a>
    );
};
