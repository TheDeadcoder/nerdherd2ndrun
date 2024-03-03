import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
let teacherNow;
let noteNow;
let ownerNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {

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



    let { data: classnote, error: err5 } = await supabase
        .from('classnote')
        .select("*")
        .eq('id', params.noteid);

    noteNow = classnote[0];

    let { data: access, error } = await supabase
        .from('access')
        .select("*")
        .eq('noteid', noteNow.id);

    const accessPeople = await Promise.all(access.map(async (accessItem) => {
        let { data: dtty, error: pendingError } = await supabase
            .from('commonuser')
            .select("*")
            .eq('id', accessItem.cuid);

        let tempy = dtty[0];
        let tuser;

        if (tempy.istrainer) {
            let { data: dteachery, error: pendingError } = await supabase
                .from('teacher')
                .select("*")
                .eq('id', tempy.id);

            tuser = dteachery[0];
        }
        else {
            let { data: dstudenty, error: pendingError } = await supabase
                .from('student')
                .select("*")
                .eq('id', tempy.id);

            tuser = dstudenty[0];
        }



        // Attach pendingclass data to classItem
        return {
            ...accessItem,
            tuser // This adds the pendingclass array to each classItem
        };
    }));


    let { data: dttt, error: pendingError } = await supabase
        .from('commonuser')
        .select("*")
        .eq('id', noteNow.owner);

    let temp = dttt[0];

    if (temp.istrainer) {
        let { data: dteacher, error: pendingError } = await supabase
            .from('teacher')
            .select("*")
            .eq('id', temp.id);

        ownerNow = dteacher[0];
    }
    else {
        let { data: dstudent, error: pendingError } = await supabase
            .from('student')
            .select("*")
            .eq('id', temp.id);

        ownerNow = dstudent[0];
    }



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

    return { classNow, teacherNow, students, ownerNow, accessPeople };
}