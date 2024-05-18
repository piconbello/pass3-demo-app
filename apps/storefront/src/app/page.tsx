'use client';
import { log } from '@repo/logger';
import { CounterButton, Link } from '@repo/ui';
import React, { MouseEventHandler, useEffect, useState } from 'react';

// export const metadata = {
//   title: 'Store | Kitchen Sink',
// };

export default function Store(): JSX.Element {
  log('Hey! This is the Store page.');
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);

  const connectClick = (_: any) => {
    const left = window.screenX + (window.outerWidth - 500) / 2;
    const top = window.screenY + (window.outerHeight - 400) / 2.5;
    const title = `PASS3 AUTHENTICATION`;
    const url = `http://localhost:3020/auth/login?client_id=1234&redirect_uri=http://localhost:3010/pass`;
    const popup = window.open(
      url,
      title,
      `width=${500},height=${400},left=${left},top=${top}`
    );
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(async () => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      try {
        const currentUrl = externalPopup.location.href;
        if (!currentUrl) {
          return;
        }
        const searchParams = new URL(currentUrl).searchParams;
        const code = searchParams.get('code');
        if (code) {
          externalPopup.close();
          console.log(`The popup URL has URL code param = ${code}`);
          await fetch(`http://localhost:3011/auth/pass3/${code}`)
            .then(async (response) => {
              // change UI to show after the code was stored
              const status = response.status;
              if (status === 200) {
                // success
                const data = await response.json();
                console.log(data);
              } else {
                // error
              }
            })
            .catch(() => {
              // API error
            })
            .finally(() => {
              // clear timer at the end
              setExternalPopup(null);
              timer && clearInterval(timer);
            });
        }
      } catch (error) {
        // console.log('error: ', error); // uncomment for debugging
      }
    }, 500);
  }, [externalPopup]);

  return (
    <div className='container'>
      <h1 className='title'>
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <button onClick={connectClick}>Connect</button>
      <CounterButton />
      <p className='description'>
        Built With{' '}
        <Link href='https://turbo.build/repo' newTab>
          Turborepo
        </Link>
        {' & '}
        <Link href='https://nextjs.org/' newTab>
          Next.js
        </Link>
      </p>
    </div>
  );
}
