// middleware.js — password-protects ONLY /prototype-eshant.html
// The password is read from the PROTOTYPE_PASSWORD environment variable
// (set it in Vercel → Settings → Environment Variables), so it never
// lives in the repo.
export const config = {
  matcher: '/prototype-eshant.html',
};

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const [, password] = atob(encoded).split(':'); // decodes "user:pass"
      if (password === process.env.PROTOTYPE_PASSWORD) {
        return; // correct password → allow the file through
      }
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="LabNexus Prototype"' },
  });
}
