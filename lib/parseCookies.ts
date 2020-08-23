import { NextPageContext } from 'next'
import cookie from 'cookie';

export const parseCookies = ({ req} : NextPageContext) => {
  return cookie.parse(req? req.headers.cookie || '' : document.cookie);
}