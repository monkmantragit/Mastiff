import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '@/lib/directus-server';

/**
 * Asset proxy: streams a Directus file to the browser, adding the Directus token on the
 * server so it never appears in HTML or client JavaScript.
 *
 * - Only image and video files are served; anything else returns 404.
 * - Range requests are passed through so videos can seek.
 * - Only Directus image-transform params are forwarded.
 */

const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const FORWARDED_PARAMS = ['width', 'height', 'quality', 'fit', 'format', 'key'];
const PASSTHROUGH_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
];

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ID_PATTERN.test(id)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const config = getDirectusConfig();
  if (!config) {
    return new NextResponse('Asset service unavailable', { status: 503 });
  }

  const upstreamParams = new URLSearchParams();
  for (const key of FORWARDED_PARAMS) {
    const value = request.nextUrl.searchParams.get(key);
    if (value && value.length <= 64) upstreamParams.set(key, value);
  }
  const qs = upstreamParams.toString();

  const headers: Record<string, string> = { Authorization: `Bearer ${config.token}` };
  const range = request.headers.get('range');
  if (range) headers.Range = range;
  const ifNoneMatch = request.headers.get('if-none-match');
  if (ifNoneMatch) headers['If-None-Match'] = ifNoneMatch;

  let upstream: Response;
  try {
    upstream = await fetch(`${config.url}/assets/${encodeURIComponent(id)}${qs ? `?${qs}` : ''}`, {
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return new NextResponse('Asset temporarily unavailable', { status: 502 });
  }

  if (upstream.status === 304) {
    return new NextResponse(null, { status: 304 });
  }

  if (!upstream.ok && upstream.status !== 206) {
    return new NextResponse('Not found', { status: upstream.status === 404 || upstream.status === 403 ? 404 : 502 });
  }

  const contentType = upstream.headers.get('content-type') || '';
  // SVG can carry script and would run on whitemassif.com if opened directly.
  if ((!contentType.startsWith('image/') && !contentType.startsWith('video/')) || contentType.includes('svg')) {
    await upstream.body?.cancel();
    return new NextResponse('Not found', { status: 404 });
  }

  const responseHeaders = new Headers();
  for (const name of PASSTHROUGH_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  responseHeaders.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('Content-Security-Policy', "default-src 'none'; sandbox");

  return new NextResponse(upstream.body, { status: upstream.status, headers: responseHeaders });
}
