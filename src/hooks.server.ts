import pocketBaseInstance from '$lib/pocketbase/pocketbase';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    // Get the auth token and user from cookies
    const token = event.cookies.get('pb_auth');
    const user = event.cookies.get('pb_user');
    const currentPath = event.url.pathname;

    if (token && user) {
        try {
            pocketBaseInstance.authStore.save(token);

            if (pocketBaseInstance.authStore.isValid) {
                event.locals.user = JSON.parse(user);
            } else {
                event.locals.user = null;
                return redirect(302, '/login');
            }
        } catch (err) {
            console.error('Error validating token or parsing user cookie:', err);
            event.locals.user = null;
            return redirect(302, '/login');
        }
    }

    // If no token and trying to go to protected paths, redirect them, to login
    else if (currentPath !== '/login' && currentPath !== '/register') {
        event.locals.user = null;
        return redirect(303, '/login');  // Redirect to the login page
    }

    // Proceed with the request if everything is valid
    return resolve(event);
}
