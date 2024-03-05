/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_BASE: string
  readonly VITE_APP_GITHUB: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
