import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let articleNow;
let teacherNow;
let commonuserNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.articleid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();



    let { data: dttt, error: err } = await supabase
        .from('commonuser')
        .select("*")
        .eq('email', user.email)


    commonuserNow = dttt[0];

    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('id', params.articleid)

    articleNow = blog[0];

    let { data: teacher, error: err3 } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', articleNow.teacherid)

    teacherNow = teacher[0];



    return { articleNow, teacherNow, commonuserNow };

}