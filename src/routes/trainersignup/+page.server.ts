import { fail, redirect } from '@sveltejs/kit'
import { z } from "zod"
import { superValidate, message } from "sveltekit-superforms/server"
import { AuthApiError } from '@supabase/supabase-js';

const phoneRegex = /^01\d{9}$/;
const today = new Date();
today.setHours(0, 0, 0, 0);
const newSignupSchema = z
    .object({
        name: z.string().min(3, { message: 'Name is required and at least of length 3' }),
        dob: z.string().refine(
            (dob) => {
                // Convert the input string to a Date object
                const inputDate = new Date(dob);
                inputDate.setHours(0, 0, 0, 0);
                // Check that the input date is before today
                return inputDate < today;
            },
            {
                message: 'Date of birth must be in the past'
            }
        ),
        address: z.string().optional(),
        gender: z.enum(['Male', 'Female', 'Rather Not Say']),
        currstatus: z.string().min(1, { message: 'Current Status is required' }),
        currins: z.string().optional(),
        highestdeg: z.string().min(1, { message: 'Highest Degree is required' }),
        currdeg: z.string().optional(),
        mobile: z
            .string()
            .regex(phoneRegex, { message: 'Phone number must be exactly 11 digits and start with 01' }),
        email: z
            .string()
            .email({ message: 'Invalid email address' })
            .min(1, { message: 'Email is required' }),
        password: z
            .string()
            .min(7, {
                message: `Password must be at least 7 characters containing at least 1 uppercase letter, 1 special character, 1 number`
            })
            .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
            .regex(/[0-9]/, { message: 'Password must contain at least one number' })
            .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),

        confirmPassword: z.string(),
        reasoning: z.string().min(15, { message: 'Your reasoning must be at least 15 words long' }),
        interest: z.string().optional()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'] // This specifies that the error should be attached to the confirmPassword field
    });

export const load = async (event) => {
    const form = await superValidate(event, newSignupSchema)
    return {
        form
    }
}



export const actions = {
    default: async (event) => {

        //const form = await event.request.formData();
        const form = await superValidate(event, newSignupSchema);
        //console.log("hello world I am in console");
        console.log(form);


        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        // const { data: user, error: err1 } = await event.locals.supabase
        //     .from('pendingrequest')
        //     .select('email')
        //     .eq('email', form.data.email)
        //     .single();


        let { data: pendingrequest, error: err1 } = await event.locals.supabase
            .from('pendingrequest')
            .select("*")
            .eq('email', form.data.email)


        console.log(pendingrequest, err1)

        if (err1) {
            return message(form, 'Searching failed. Please try again', {
                status: 500
            })
        }

        if (pendingrequest?.length) {
            return message(form, 'This mail has already been registered', {
                status: 400
            })
        }




        // const { data, error: err2 } = await event.locals.supabase
        //     .from('pendingrequest')
        //     .insert([
        //         { name: form.data.name.toString },
        //         { dob: form.data.dob.toString },
        //         { address: form.data.address?.toString },
        //         { gender: form.data.gender.toString },
        //         { currstatus: form.data.currstatus.toString },
        //         { currins: form.data.currins?.toString },
        //         { highestdeg: form.data.highestdeg.toString },
        //         { currdeg: form.data.currdeg?.toString },
        //         { mobile: form.data.mobile.toString },
        //         { email: form.data.email.toString },
        //         { reasoning: form.data.reasoning.toString },
        //         { interest: form.data.interest?.toString },
        //         { password: form.data.password.toString },
        //     ])

        const { confirmPassword, ...insertData } = form.data;

        // Email does not exist, insert new record
        const { error: err2 } = await event.locals.supabase
            .from('pendingrequest')
            .insert([insertData]);

        console.log("Ekhane aslam")
        console.log(err2);
        if (err2) {
            return message(form, 'Sign up failed. Please try again', {
                status: 500
            })
        }


        return message(form, 'Sign Up successful. Please wait for the Admin to approve your request');


        return { form }
    }
}