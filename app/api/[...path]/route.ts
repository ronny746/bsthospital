import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE =
  process.env.BACKEND_INTERNAL_URL || 'http://srv2008573.hstgr.cloud:5432';

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathStr = Array.isArray(path) ? path.join('/') : path || '';
    const targetUrl = new URL(`/api/${pathStr}`, BACKEND_BASE);
    targetUrl.search = request.nextUrl.search;

    const reqHeaders = new Headers();
    request.headers.forEach((value, key) => {
      // Omit host and Cloudflare-specific or problematic hop-by-hop headers
      const lower = key.toLowerCase();
      if (
        lower !== 'host' &&
        lower !== 'connection' &&
        lower !== 'content-length' &&
        !lower.startsWith('cf-')
      ) {
        reqHeaders.set(key, value);
      }
    });

    // Provide proper host for the backend
    reqHeaders.set('host', 'srv2008573.hstgr.cloud:5432');

    let body: ArrayBuffer | undefined = undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.arrayBuffer();
    }

    const backendRes = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: reqHeaders,
      body,
      redirect: 'manual',
    });

    const resHeaders = new Headers();
    backendRes.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      // Let Cloudflare/Vinext handle compression and content-length
      if (
        lower !== 'content-encoding' &&
        lower !== 'content-length' &&
        lower !== 'transfer-encoding'
      ) {
        resHeaders.set(key, value);
      }
    });

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: resHeaders,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[API Proxy Error]:', errorMsg);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to connect to hospital backend server',
        error: errorMsg,
      },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
export const OPTIONS = proxyRequest;
