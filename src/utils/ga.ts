import { GAUA } from 'constants/config';
import { isElectron } from 'utils/electron';

interface IGaEvent {
  category: string;
  action: string;
  label: string;
  value: string;
}
export const gaPage = (page: string) => {
  if (isElectron) {
    const cid = localStorage.getItem('unique-app-id');

    const Analytics = require('electron-google-analytics').default;
    const analytics = new Analytics(GAUA);
    const cookieDomain = 'https://web.gistoapp.com';

    return analytics.pageview(cookieDomain, page, 'Gisto', cid);
  }

  gtag('config', GAUA, {
    page_path: page,
    page_title: page
  });

  return true;
};

export const gaEvent = ({ category, action, label, value }: IGaEvent): boolean => {
  if (isElectron) {
    const cid = localStorage.getItem('unique-app-id');
    const Analytics = require('electron-google-analytics').default;
    const analytics = new Analytics(GAUA);

    return analytics.event(category, action, { evLabel: label, evValue: value, clientID: cid });
  }

  gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  });

  return true;
};
