import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let studentNow;
function calculateContestEndTime(contestNow) {
    const startTime = new Date(contestNow.start).getTime(); // Convert start time to milliseconds
    const durationMilliseconds = contestNow.duration * 60000; // Convert duration from minutes to milliseconds
    return new Date(startTime + durationMilliseconds);
}

export const load = async ({ locals: { supabase, getSession } }) => {
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



    let { data: follower, error: err4 } = await supabase
        .from('follower')
        .select("*")
        .eq('ifollow', studentNow.id)


    let blog = [];

    for (let i = 0; i < follower?.length; i++) {
        let { data: currBlog, error: err2 } = await supabase
            .from('blog')
            .select('*')
            .eq('teacherid', follower[i].followu);

        blog = [...blog, ...currBlog];

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
        blogItem.saved = false;
        let currTeacher = teacher[0];

        // Attach pendingclass data to classItem
        return {
            ...blogItem,
            currTeacher // This adds the pendingclass array to each classItem
        };
    }));

    let { data: pbcontestx, error } = await supabase
        .from('pbcontest')
        .select("*")

        // Filters
        .eq('isover', false)
        .limit(2)

    pbcontestx.sort((a, b) => new Date(b.start) - new Date(a.start));
    //console.log(pbcontestx);
    let pbcontest = pbcontestx[0];


    pbcontest.countdown = 0;
    pbcontest.contestEndTime = calculateContestEndTime(pbcontest);

    let { data: teacher, error: err88 } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', pbcontest.teacherid)
    pbcontest.teacher = teacher[0];

    console.log(pbcontest);

    return { blogwithTeacherName, studentNow, pbcontest }


    return { blogwithTeacherName, studentNow }
}