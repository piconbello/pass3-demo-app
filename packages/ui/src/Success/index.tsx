'use client';
import { log } from '@repo/logger';
import { CounterButton, Link } from '@repo/ui';
import React, { MouseEventHandler, useEffect, useState } from 'react';

// export const metadata = {
//   title: 'Store | Kitchen Sink',
// };

export function Success(props: {
  attemptId: string;
  walletId: string;
  success: boolean;
}): JSX.Element {
  const { attemptId, walletId, success } = props;
  return (
    <div className='container'>
      <h1 className='title'>Success!</h1>
      <p className='description'>
        You have successfully logged in using Pass3.
      </p>
      <div
        style={{
          background: `rgba(86, 238, 170, 0.518)`,
          borderRadius: `8px`,
          padding: '1.5rem',
          fontWeight: 500,
        }}
      >
        <p style={{ margin: '0 0 1.5rem 0' }}>
          Backend response: <br />
          <code
            style={{
              padding: '0.2rem 0.3rem',
              background: `rgba(0,0,0,0.1)`,
              borderRadius: '0.25rem',
            }}
          >
            {JSON.stringify({ attemptId, walletId, success }, null, 2)}
          </code>
        </p>
      </div>
    </div>
  );
}
