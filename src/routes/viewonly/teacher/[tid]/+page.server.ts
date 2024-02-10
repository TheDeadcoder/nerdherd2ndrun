import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let teacherNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.tid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', params.tid)


    teacherNow = teacher[0];

    return { teacherNow };

}