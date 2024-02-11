// src/routes/login/+page.server.ts
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

        const { data: user, error: err } = await event.locals.supabase
            .from('commonuser')
            .select('email')
            .eq('email', email)
            .single();
        
        console.log(user, err);

        if (user) {
            return message(form, 'This mail has already been registered', {
                status: 400
        })
        }

        const { data, error: err1 } = await event.locals.supabase
            .from('commonuser')
            .insert([
                { istrainer: false, email: email },
            ])
            

        if (err1) {
            return message(form, 'Sign up failed. Please try again', {
                status: 500
        })
        }
        console.log(err1);

        const { error: err2 } = await event.locals.supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `https://nerdherd-iota.vercel.app/learnerlogin`,
            },
        })

        if (err2) {
            return message(form, 'Server Error. Sorry ', {
                status: 500
        })
        }

        //return { form }
    }
}

// import { AuthApiError } from '@supabase/supabase-js';
// import { fail, redirect } from '@sveltejs/kit';
// import { message, superValidate } from 'sveltekit-superforms/server';
// import { z } from 'zod';

// export const load = async (event) => {
// 	const form = await superValidate(event, userSchema);
// 	return {form}
// };

// const userSchema = z.object({
// 	email: z
// 		.string({ required_error: 'Email is required' })
// 		.min(1, { message: 'Email is required' })
// 		.max(256, { message: 'Email must be ;ess than 256 characters' })
// 		.email({ message: 'Email must be a valid email address' }),
// 	password: z
// 		.string({ required_error: 'Password is required' })
// 		.min(8, { message: 'Password must be at least 8 characters' })
// 		.max(32, { message: 'Password must be less than 32 characters' })
// 		.regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
// 		.regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
// 		.regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
// 		.regex(
// 			new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
// 			'Password must contain at least one special character'
// 		)
// 		.trim()
// });

// export const actions = {
// 	login: async (event) => {
// 		const form = await superValidate(event, userSchema);
// 		// console.log(form);

// 		if (!form.valid) {
// 			return message(form, 'Invalid form')
// 		}

// 		const body = form.data;
// 		// console.log(body);

// 		const { data, error: err } = await event.locals.supabase.auth.signInWithPassword({
// 			email: body.email as string,
// 			password: body.password as string
// 		});

// 		if (err) {
// 			// console.log(err);
// 			if (err instanceof AuthApiError && err.status === 400) {
// 				return message(form, 'Invalid credentials', {
// 					status: 400
// 				})
// 			}

// 			return message(form, 'Server error. Try again later', {
// 				status: 500
// 			})
// 		}
		
// 		//Add user if not already added 
// 		await event.fetch('/api/user/add', {
// 			method: 'POST',
// 			body: JSON.stringify({ userName: body.email.split('@')[0],email: body.email})
// 		})
		
// 		throw redirect(303, '/home/session/my-session');
// 	}
// };
