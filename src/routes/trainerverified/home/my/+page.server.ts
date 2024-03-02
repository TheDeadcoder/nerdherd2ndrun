import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let teacherNow;
export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    //console.log(user);


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('email', user.email)

    teacherNow = teacher[0];


    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('teacherid', teacher[0].id)

    return { teacherNow, blog }
}

export const actions = {

    deleteBlog: async ({ url, locals: { supabase, getSession } }) => {
        const blogid = url.searchParams.get("id")
        //console.log("ami todo delete korte chai ", todoid);

        if (!blogid) {
            return fail(400, { message: "Invalid request" })
        }

        const { error: err } = await supabase
            .from('blog')
            .delete()
            .eq("id", blogid)

        if (err) console.log(err)
        else throw redirect(303, '/trainerverified/home/my');

    },


}


