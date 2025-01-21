import type {Actions}  from './$types';
import pocketBaseInstance from "$lib/pocketbase/pocketbase";
import {redirect} from "@sveltejs/kit";
export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = Object.fromEntries(await request.formData()) as {
            email: string;
            password: string;
        };

        try {
            await pocketBaseInstance.collection('users').authWithPassword(data.email, data.password);
            console.log("Logged user in: " + data.email);

            const token = pocketBaseInstance.authStore.token;
            const user = pocketBaseInstance.authStore.baseModel;

            cookies.set('pb_auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 1209600  // 14 days
            });

            cookies.set('pb_user', JSON.stringify(user), {
                httpOnly: false, // Allow access from client-side for UI rendering
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 1209600  // 14 days
            });
        } catch (error) {
            console.error("Error logging in user:", error);
        }

        return redirect(302, '/');
    }
}