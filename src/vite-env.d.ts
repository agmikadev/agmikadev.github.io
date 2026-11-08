/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORTFOLIO_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
