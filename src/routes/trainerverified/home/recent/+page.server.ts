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

    let { data: blog, error: err2 } = await supabase
        .from('blog')
        .select('*')

    const blogwithTeacherName = await Promise.all(blog.map(async (blogItem) => {
        let { data: teacher, error: pendingError } = await supabase
            .from('teacher')
            .select("*")
            .eq('id', blogItem.teacherid);

        blogItem.tags = blogItem.tags.split(',');
        blogItem.saved = false;
        let currTeacher = teacher[0];

        // Attach pendingclass data to classItem
        return {
            ...blogItem,
            currTeacher // This adds the pendingclass array to each classItem
        };
    }));

    console.log(err);
    return { blogwithTeacherName, teacherNow }
}