import type { AppProps } from "next/app";
import Script from "next/script";
import { init as initMatomo } from "@socialgouv/matomo-next";
import "../styles/globals.css";
import { useEffect } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL as string;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID as string;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initMatomo({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);

  return (
    <>
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3110094,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      <Script id="landbot2" strategy="lazyOnload">
        {`

          window.addEventListener('mouseover', initLandbot, { once: true });
          window.addEventListener('touchstart', initLandbot, { once: true });
          var myLandbot;
          function initLandbot() {
            if (!myLandbot) {
              var s = document.createElement('script');s.type = 'text/javascript';s.async = true;
              s.addEventListener('load', function() {
                var myLandbot = new Landbot.Livechat({
                  configUrl: 'https://storage.googleapis.com/landbot.pro/v3/H-1390226-XLZ4JE4K1S0EPHSK/index.json',
                });
              });
              s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
              var x = document.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            }
          }

        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
