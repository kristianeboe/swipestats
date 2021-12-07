import React from 'react';

const buttonCategories = {
  primary:
    'block w-full rounded-md border border-transparent px-5 py-3 bg-rose-500 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10',
  white:
    'block w-full rounded-md border border-transparent px-5 py-3 bg-white text-base font-medium text-gray-900 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:px-10',
};

export function Button({
  type = 'button',
  category = 'primary',
  content,
  children,
}: {
  type?: 'submit' | 'button';
  category?: keyof typeof buttonCategories;
  content?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type={type} className={buttonCategories[category]}>
      {content ? content : children}
    </button>
  );
}
