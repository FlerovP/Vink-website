"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

/* Always use en-US: ru.trustpilot.com doesn't exist and causes broken links */
const TRUSTPILOT_LOCALE = "en-US";

export default function TrustpilotBanner({ className = "" }: { className?: string }) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const businessUnitId = siteConfig.trustpilotBusinessUnitId;
  if (!businessUnitId) return null;

  useEffect(() => {
    if (!scriptReady || !widgetRef.current || !window.Trustpilot) return;
    window.Trustpilot.loadFromElement(widgetRef.current, true);
  }, [scriptReady]);

  return (
    <div className={className}>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale={TRUSTPILOT_LOCALE}
        data-template-id={siteConfig.trustpilotTemplateId}
        data-businessunit-id={businessUnitId}
        data-style-height="52px"
        data-style-width="100%"
        data-token={siteConfig.trustpilotToken}
      >
        <a
          href={siteConfig.trustpilotUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
}
