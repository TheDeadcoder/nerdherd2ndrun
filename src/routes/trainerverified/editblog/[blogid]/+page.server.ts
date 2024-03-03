import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let articleNow;
let teacherNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    //console.log(params.blogid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();



    let { data: dttt, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('email', user.email)


    teacherNow = dttt[0];

    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('id', params.blogid)

    articleNow = blog[0];

    return { articleNow, teacherNow };

}

export const actions = {
    edit: async (event) => {
        //console.log("Ami blog er backend e asi");
        const data = await event.request.formData();
        let newBlog = Object.fromEntries(data.entries()) as any;
        //console.log(newBlog)


        const { data: dtt, error: err } = await event.locals.supabase
            .from('blog')
            .update({ title: newBlog.title, description: newBlog.description, timetoread: newBlog.timetoread, tags: newBlog.tags, content: newBlog.content, createdat: new Date() })
            .eq('id', articleNow.id)
            .select()

        if (err) console.log(err)
        else throw redirect(303, '/trainerverified/home/my');
    },

    deleteBlog: async ({ request, locals: { supabase, getSession } }) => {

        const { error: err } = await supabase
            .from('blog')
            .delete()
            .eq('id', articleNow.id)


        if (err) console.log(err)
        else throw redirect(303, '/trainerverified/home/my');

    },
} satisfies Actions;