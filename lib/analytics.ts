const CONSENT_KEY = "vink_cookie_consent";
const LOG_ENDPOINT = "/api/log";

let initialized = false;

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  if (!hasConsent()) return;

  initialized = true;

  logEvent("page_view", {
    url: window.location.href,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timestamp: new Date().toISOString(),
  });

  const origPush = history.pushState.bind(history);
  history.pushState = function (...args) {
    origPush(...args);
    logEvent("page_view", {
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  };

  window.addEventListener("popstate", () => {
    logEvent("page_view", {
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  });
}

export function logEvent(event: string, data: Record<string, unknown> = {}) {
  if (!hasConsent()) return;

  const payload = {
    event,
    ...data,
    sessionId: getSessionId(),
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon(LOG_ENDPOINT, JSON.stringify(payload));
  } else {
    fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

function getSessionId(): string {
  let sid = sessionStorage.getItem("vink_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("vink_session_id", sid);
  }
  return sid;
}
