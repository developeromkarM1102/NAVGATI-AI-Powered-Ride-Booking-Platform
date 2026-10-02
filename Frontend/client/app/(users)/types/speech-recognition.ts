export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

export interface SpeechRecognitionResultItem {
  transcript: string;
}

export interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  [index: number]: SpeechRecognitionResultItem;
}

export interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  start(): void;
  stop(): void;
  abort(): void;

  onstart: (() => void) | null;
  onresult:
    | ((event: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((event: SpeechRecognitionErrorEvent) => void)
    | null;
  onend: (() => void) | null;
}

export interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}