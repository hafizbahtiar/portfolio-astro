import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
    if (!url.pathname.startsWith('/admin')) {
        return next()
    }

    // Both cookies are httpOnly — the browser sends them but JS cannot forge them.
    // Checking refresh_token handles the case where access_token has expired
    // but the user still has a valid session.
    const isAuthenticated = cookies.has('access_token') || cookies.has('refresh_token')
    if (!isAuthenticated) {
        return redirect('/login')
    }

    return next()
})
