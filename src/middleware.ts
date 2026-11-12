import { type NextRequest, NextResponse } from "next/server";

const LOCALE_LANG_MAP: Record<string, string> = {
  "en-us": "en",
  "en-gb": "en",
  "en-ae": "en",
  "hi": "hi",
  "de": "de",
  "nl": "nl",
  "fr": "fr",
  "pt": "pt",
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const [, locale] = request.nextUrl.pathname.split("/");
  const lang = LOCALE_LANG_MAP[locale];
  if (lang) {
    response.headers.set("x-lang", lang);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|icons|fonts).*)"],
};
