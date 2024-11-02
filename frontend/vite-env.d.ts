/// <reference types="vite/client" />
/// <reference types="vite/types/" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
