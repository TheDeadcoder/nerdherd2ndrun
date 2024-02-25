import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
let teacherNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.classid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }


    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)

    classNow = classes[0];

    let { data: teacher, error: err3 } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', classes[0].teacherid)

    teacherNow = teacher[0];

    let { data: studclass, error: err2 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)
        .eq('joined', true)


    return { classNow, studclass, teacherNow };

}