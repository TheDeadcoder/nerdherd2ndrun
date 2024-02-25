import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let studentNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.sid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }


    let { data: student, error: err } = await supabase
        .from('student')
        .select("*")
        .eq('id', params.sid)


    studentNow = student[0];


    let { data: studentqual, error } = await supabase
        .from('studentqual')
        .select("*")
        .eq('studentid', studentNow.id)





    return { studentNow, studentqual };

}