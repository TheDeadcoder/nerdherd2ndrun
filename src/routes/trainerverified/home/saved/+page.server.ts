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


    let { data: savedblog, error: err7 } = await supabase
        .from('savedblog')
        .select("*")
        .eq('commonuserid', teacherNow.id);

    let blog = [];

    for (let i = 0; i < savedblog?.length; i++) {
        let { data: currBlog, error: err2 } = await supabase
            .from('blog')
            .select('*')
            .eq('id', savedblog[i].blogid);

        blog = [...blog, currBlog[0]];

    }

    // console.log("blogs are");
    // console.log(blog);
    // console.log("saved are");
    // console.log(savedblog);

    // let blogwithTeacherName = blog;

    const blogwithTeacherName = await Promise.all(blog.map(async (blogItem) => {
        let { data: teacher, error: pendingError } = await supabase
            .from('teacher')
            .select("*")
            .eq('id', blogItem.teacherid);

        blogItem.tags = blogItem.tags.split(',');
        blogItem.saved = true;
        let currTeacher = teacher[0];

        // Attach pendingclass data to classItem
        return {
            ...blogItem,
            currTeacher // This adds the pendingclass array to each classItem
        };
    }));


    return { blogwithTeacherName, teacherNow }
}