import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let teacherNow;
let commonUserNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.tid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const {
        data: { user }
    } = await supabase.auth.getUser();
    //console.log(user);


    let { data: commonuser, error: err9 } = await supabase
        .from('commonuser')
        .select("*")
        .eq('email', user.email)

    commonUserNow = commonuser[0];


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', params.tid)

    console.log("err", err);


    teacherNow = teacher[0];
    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('teacherid', teacher[0].id)
        .limit(2)

    console.log("err1", err1);


    let { data: classes, error: err5 } = await supabase
        .from('classes')
        .select("*")
        .eq('teacherid', teacher[0].id)
    console.log("err5", err5);

    let { data: teacherqual, error: err6 } = await supabase
        .from('teacherqual')
        .select("*")
        .eq('teacherid', teacherNow.id)

    console.log("err6", err6);

    let { data: teacherskills, error: err7 } = await supabase
        .from('teacherskills')
        .select("*")
        .eq('teacherid', teacherNow.id)

    console.log("err7", err7);


    let { data: follower, error } = await supabase
        .from('follower')
        .select("*")
        .eq('ifollow', commonUserNow.id)
        .eq('followu', teacherNow.id)





    return { teacherNow, blog, classes, teacherqual, teacherskills, commonUserNow, follower }



}