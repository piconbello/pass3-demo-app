'use client';
import { log } from '@repo/logger';
import { CounterButton, Link } from '@repo/ui';
import React, { MouseEventHandler, useEffect, useState } from 'react';

// export const metadata = {
//   title: 'Store | Kitchen Sink',
// };

export default function Pass(): JSX.Element {
  return (
    <div className='container'>
      <h1 className='title'>Authenticating</h1>
      <p className='description'>This popup will close soon, please wait...</p>
    </div>
  );
}
