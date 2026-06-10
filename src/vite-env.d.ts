/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the enquiry API backend (defaults to http://localhost:5000). */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
