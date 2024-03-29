import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
let teacherNow;

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


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('email', user.email)
    teacherNow = teacher[0];


    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)

    classNow = classes[0];


    let { data: classlive, error: err3 } = await supabase
        .from('classlive')
        .select("*")
        .eq('classid', classNow.id)


    let { data: assignment, error } = await supabase
        .from('assignment')
        .select("*")
        .eq('cid', classNow.id);




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

    return { classNow, students, teacherNow, classlive, assignment };

}