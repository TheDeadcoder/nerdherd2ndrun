import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';


let teacherNow;
export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    console.log("New post add er backend");
    console.log(user);


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    teacherNow = teacher[0];


    return { teacherNow };
}
export const actions = {
    create: async (event) => {
        console.log("Ami blog er backend e asi");
        const data = await event.request.formData();
        let newBlog = Object.fromEntries(data.entries()) as any;
        console.log(newBlog)


        const { data: dt, error: err1 } = await event.locals.supabase
            .from('blog')
            .insert([
                { teacherid: teacherNow.id, title: newBlog.title, description: newBlog.description, timetoread: newBlog.timetoread, tags: newBlog.tags, content: newBlog.content, createdat: new Date() },
            ])
            .select()


        if (err1) console.log(err1)
        else throw redirect(303, '/trainerverified/home/my');
    }
} satisfies Actions;