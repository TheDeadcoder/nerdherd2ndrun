import { fail, redirect } from '@sveltejs/kit'
import { z } from "zod"
import { superValidate, message } from "sveltekit-superforms/server"
import { AuthApiError } from '@supabase/supabase-js';

const newSignupSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(7, { message: "Password must be at least 7 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
});

export const load = async (event) => {
    const form = await superValidate(event, newSignupSchema)
    return {
        form
    }
}

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, newSignupSchema)
        //console.log(form)
        const email = form.data.email;
        const password = form.data.password;

        console.log(email, password);

        // const supabase = event.locals.supabase;

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const { data, error: err } = await event.locals.supabase.auth.signInWithPassword({
            email: email as string,
            password: password as string
        });

        if (err) {
            // console.log(err);
            if (err instanceof AuthApiError && err.status === 400) {
                return message(form, 'Invalid credentials. Wrong email or Password', {
                    status: 400
                })
            }

            return message(form, 'Server error. Try again later', {
                status: 500
            })
        }

        throw redirect(303, '/adminverified/permit');
        //return { form }
    }
}
