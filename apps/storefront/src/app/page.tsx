'use client';
import { log } from '@repo/logger';
import { CounterButton, Button, Link, Fail, Success } from '@repo/ui';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export default function Store(): JSX.Element {
  log('Hey! This is the Store page.');
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [backendResponse, setBackendResponse] = useState<any>(null);

  const connectClick = () => {
    const left = window.screenX + (window.outerWidth - 700) / 2;
    const top = window.screenY + (window.outerHeight - 700) / 2.5;
    const title = `PASS3 AUTHENTICATION`;
    const url = `https://app.pass3.co/?client_id=kitchen-sing&redirect_uri=https://p3-demo-storefront.vercel.app/pass`;
    const popup = window.open(
      url,
      title,
      `width=${700},height=${700},left=${left},top=${top}`
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
          await fetch(`https://p3-demo-api.vercel.app/auth/pass3/${code}`)
            .then(async (response) => {
              // change UI to show after the code was stored
              const status = response.status;
              if (status === 200) {
                // success
                const data = await response.json();
                console.log(data);
                setBackendResponse(data);
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
    <>
      {!backendResponse && (
        <div className="container">
          <h1 className="title">
            Welcome to <br />
            <span>Kitchen Sing</span>
          </h1>
          <div
            style={{
              background: `rgba(68, 161, 255, 0.25)`,
              borderRadius: `8px`,
              padding: '1.5rem',
              fontWeight: 500,
              color: 'rgb(10, 63, 119)',
            }}
          >
            <p style={{ margin: '0 0 0 0' }}>Login to proceed further...</p>
          </div>
          <Button onClick={connectClick}>Login with Pass3</Button>
        </div>
      )}
      {backendResponse && backendResponse.success && (
        <Success {...backendResponse} />
      )}
      {backendResponse && !backendResponse.success && (
        <Fail {...backendResponse} />
      )}
    </>
  );
}
