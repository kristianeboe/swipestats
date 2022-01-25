/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { classNames } from '../../lib/utils';

const buttonCategories = {
  // shadow-rose-500/50
  primary:
    'block w-full rounded-md border border-transparent px-5 py-3 bg-rose-500 text-base font-medium text-white shadow hover:bg-rose-600 disabled:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10',
  secondary:
    'block w-full items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-rose-600 bg-white hover:bg-rose-50 rounded-md shadow',
  white:
    'block w-full rounded-md border border-transparent px-5 py-3 bg-white text-base font-medium text-gray-900 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:px-10',
  // refactor
  flex: 'mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-500 hover:bg-rose-400 disabled:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rose-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0',
};

export function Button({
  type = 'button',
  category = 'primary',
  ...props
}: {
  type?: 'submit' | 'button';
  category?: keyof typeof buttonCategories;
  loading?: boolean;
  disabled?: boolean;
  content?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={classNames(
        '', //'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none',
        buttonCategories[category],
        props.className || ''
      )}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      ) : props.content ? (
        props.content
      ) : (
        props.children
      )}
    </button>
  );
}
