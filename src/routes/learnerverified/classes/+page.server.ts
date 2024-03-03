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

    let { data: classes, error: err2 } = await supabase
        .from('classes')
        .select("*");


    const classWithInfo = await Promise.all(classes.map(async (classItem) => {
        let { data: teacher, error: pendingError } = await supabase
            .from('teacher')
            .select("*")
            .eq('id', classItem.teacherid);



        let currTeacher = teacher[0];


        let { data: studclass, error: err4 } = await supabase
            .from('studclass')
            .select("*")
            .eq('sid', studentNow.id)
            .eq('cid', classItem.id);


        // Attach pendingclass data to classItem
        return {
            ...classItem,
            currTeacher,
            studclass

        };
    }));


    return { classWithInfo, studentNow }
}
export const actions = {

    joinclass: async ({ url, locals: { supabase, getSession } }) => {
        const classid = url.searchParams.get("id")
        //console.log("ami todo delete korte chai ", todoid);

        if (!classid) {
            return fail(400, { message: "Invalid request" })
        }


        const { data: dtt, error: err } = await supabase
            .from('studclass')
            .insert([
                { sid: studentNow.id, cid: classid },
            ]);



        if (err) console.log(err)
        else throw redirect(303, '/learnerverified/classes');

    },


}