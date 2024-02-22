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

    let commentsMod;
    const { data: dtt, error: err5 } = await supabase
        .from('comment')
        .select('*')
        .eq('blogid', articleNow.id);

    if (err) console.log('failed to load');
    commentsMod = dtt?.reverse();
    for (let i = 0; i < commentsMod.length; i++) {
        let uid = commentsMod[i].userid;
        let { data: dttt, error: err } = await supabase.from('commonuser').select('*').eq('id', uid);
        commentsMod[i].user = dttt[0];
    }
    // console.log(commentsMod);
    //commentCnt = dtt?.length;



    return { articleNow, teacherNow, commonuserNow, commentsMod };

}