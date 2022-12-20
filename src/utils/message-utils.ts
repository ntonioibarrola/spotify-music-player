import { Message } from '../types/message-types';

const getMessage = (description: string, type: string): Message => {
  const warning = {
    type: 'warning',
    title: 'Warning!',
    description: `No active device found. Please have a Spotify app (desktop or browser) running 
        in the background, and interact with it at least once (e.g. click the play button).`,
    url: 'https://open.spotify.com/',
    button: 'Got it, thanks!',
  };

  const error = {
    type: 'error',
    title: 'Error!',
    description: description,
    button: 'Dismiss',
  };

  const info = {
    type: 'info',
    title: 'Info.',
    description: description,
    url: 'https://open.spotify.com/',
    button: 'Got it, thanks!',
  };

  let message: Message = null;

  if (type === 'warning') message = warning as Message;
  if (type === 'error') message = error as Message;
  if (type === 'info') message = info as Message;

  return message;
};

export default getMessage;
