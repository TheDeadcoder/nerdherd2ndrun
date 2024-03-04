import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
let teacherNow;
let studentNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.classid);
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




    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)

    classNow = classes[0];

    let { data: assignment, error: err69 } = await supabase
        .from('assignment')
        .select("*")
        .eq('cid', classNow.id);

    let { data: teacher, error: err7 } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', classNow.teacherid)
    teacherNow = teacher[0];


    let { data: classlive, error: err3 } = await supabase
        .from('classlive')
        .select("*")
        .eq('classid', classNow.id)



    let { data: studclass, error: err2 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)
        .eq('joined', true)

    const students = await Promise.all(studclass.map(async (studItem) => {
        let { data: dttt, error: pendingError } = await supabase
            .from('student')
            .select("*")
            .eq('id', studItem.sid);


        let currStudent = dttt[0];

        // Attach pendingclass data to classItem
        return {
            ...studItem,
            currStudent // This adds the pendingclass array to each classItem
        };
    }));

    return { classNow, students, teacherNow, classlive, studentNow, assignment };

}