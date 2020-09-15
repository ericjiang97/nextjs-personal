type Browser = 'Chrome' | 'Safari' | 'Firefox' | 'unknown';

export interface BrowserDetails {
  browser: Browser;
  browserVersion: string;
}

const getBrowserDetails = (userAgent: string): BrowserDetails => {
  const browserRegex = RegExp(
    /(MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)/,
  );
  const ua = browserRegex.exec(userAgent);

  let browser: Browser = 'unknown';
  let browserVersion = 'unknown';
  if (ua) {
    browser = (ua[1] as Browser) || 'unknown';
    browserVersion = ua[2];
  }

  return {
    browser,
    browserVersion,
  };
};

export default getBrowserDetails;
