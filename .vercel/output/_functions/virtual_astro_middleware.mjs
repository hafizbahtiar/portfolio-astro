import { d as defineMiddleware, ae as sequence } from './chunks/params-and-props_BAr2ixHn.mjs';
import 'piccolore';
import 'clsx';

const onRequest$1 = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  if (!url.pathname.startsWith("/admin")) {
    return next();
  }
  const isAuthenticated = cookies.has("access_token") || cookies.has("refresh_token");
  if (!isAuthenticated) {
    return redirect("/login");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
