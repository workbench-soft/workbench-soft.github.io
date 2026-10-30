interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADSENSE_SLOT_PAGE?: string;
  readonly PUBLIC_ADSENSE_SLOT_ROOM?: string;
  readonly PUBLIC_ADMOB_PUBLISHER?: string;
  readonly PUBLIC_ADMOB_BANNER_ANDROID?: string;
  readonly PUBLIC_ADMOB_BANNER_IOS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
