import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
let studentNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.classid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    //console.log(user);


    let { data: student, error: err } = await supabase
        .from('student')
        .select("*")
        .eq('email', user.email)

    studentNow = student[0];


    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)

    classNow = classes[0];



    let { data: studclass, error: err2 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)
        .eq('sid', studentNow.id)
        .eq('joined', true)

    if (err2) throw redirect(303, '/')
    return { classNow, studclass, studentNow };

}