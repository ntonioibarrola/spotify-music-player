import { type DefaultSession } from 'next-auth';
import { ExtendedToken } from './index';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: ExtendedToken['accessToken'];
    error: ExtendedToken['error'];
    user?: {
      id: string;
    } & DefaultSession['user'];
  }
}
