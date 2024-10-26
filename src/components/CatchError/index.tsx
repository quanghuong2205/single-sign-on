import React from 'react';

export const CatchError = (error: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="color-red">{error.message}</pre>
    </div>
  );
};
