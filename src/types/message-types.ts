type error = 'error';
type warning = 'warning';
type info = 'info';

interface ErrorMessage {
  type: error;
  title: string;
  description: string;
  url?: string;
  button: string;
}

interface WarningMessage {
  type: warning;
  title: string;
  description: string;
  url?: string;
  button: string;
}

interface InfoMessage {
  type: info;
  title: string;
  description: string;
  url?: string;
  button: string;
}

export type Message = ErrorMessage | WarningMessage | InfoMessage | null;
