import { Message } from '../types/message-types';

const getMessage = (description: string, type: string, url?: string): Message => {
  const warning = {
    type: 'warning',
    title: 'Warning!',
    description: `No active device found. Please have a Spotify app (desktop or browser) running 
        in the background, and interact with it at least once (e.g. click the play button).`,
    url: url,
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
    url: url,
    button: 'Got it, thanks!',
  };

  let message: Message = null;

  switch (type) {
    case 'warning':
      message = warning as Message;
      break;

    case 'error':
      message = error as Message;
      break;

    case 'info':
      message = info as Message;
      break;

    default:
      break;
  }

  return message;
};

export default getMessage;
