import {type Actions, fail} from "@sveltejs/kit";

export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const errors: Record<string, string> = {};

        if (data.get('name').length > 50) errors.name = 'Name too long.'
        if (data.get('description').length > 255) errors.name = 'Description too long.'

        if (Object.keys(errors).length > 0) {
            return fail(
                400,
                { errors }
            );
        }

        console.log(data)

        return { success: true };
    }
}