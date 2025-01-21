import {redirect} from '@sveltejs/kit';
import type {Actions}  from './$types';
import pocketBaseInstance, {pocketbaseStore} from "$lib/pocketbase/pocketbase";

export const actions: Actions = {
    create: async ({ request }) => {
        const data = Object.fromEntries(await request.formData()) as {
            email: string;
            username: string;
            password: string;
            passwordConfirm: string;
        };

        try {
            const response = await pocketBaseInstance.collection('users').collection('users').create(data);
            console.log("User registered:", response);

            console.log(pocketbaseStore.authStore.isValid)
        } catch (error) {
            console.error("Error registering user:", error);
        }

        throw redirect(302, '/');
    }
}