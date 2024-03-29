import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.classid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }


    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)

    classNow = classes[0];

    let { data: assignment, error } = await supabase
        .from('assignment')
        .select("*")
        .eq('cid', classNow.id);


    let { data: studclass, error: err2 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)
        .eq('joined', true)

    const studentwithCred = await Promise.all(studclass.map(async (studItem) => {
        let { data: student, error: pendingError } = await supabase
            .from('student')
            .select("*")
            .eq('id', studItem.sid);

        studItem.student = student[0];
        let mysubmissions = [];

        for (let j = 0; j < assignment?.length; j++) {
            let { data: submissions, error: Errorx } = await supabase
                .from('submissions')
                .select("*")
                .eq('aid', assignment[j].id)
                .eq('sid', studItem.sid);

            //console.log(submissions);
            if (submissions?.length > 0) {
                let tempooo = submissions[0];
                //console.log(tempooo);
                mysubmissions = [...mysubmissions, tempooo.score];

            }
            else {
                mysubmissions = [...mysubmissions, null];
            }
        }


        console.log('ok', mysubmissions);


        let { data: credentials, error: crederror } = await supabase
            .from('credentials')
            .select("*")
            .eq('sid', studItem.student.id);


        // Attach pendingclass data to classItem
        return {
            ...studItem,
            credentials,
            mysubmissions
        };
    }));

    return { classNow, studentwithCred };

}

export const actions = {
    add: async ({ request, locals: { supabase, getSession } }) => {

        const data = await request.formData();

        let newClass = Object.fromEntries(data.entries()) as any;

        //console.log(newClass.sid, newClass.cred);


        const { data: dtx, error: err2 } = await supabase
            .from('credentials')
            .insert([
                { sid: newClass.sid, cid: classNow.id, body: newClass.cred },
            ]);

        if (err2) console.log(err2)
        else throw redirect(303, `/trainerverified/runningclass/${classNow.id}/credentials`);

    },
    edit: async ({ request, locals: { supabase, getSession } }) => {

        const data = await request.formData();

        let newClass = Object.fromEntries(data.entries()) as any;

        //console.log(newClass.sid, newClass.cred);



        const { data: dtx, error: err2 } = await supabase
            .from('credentials')
            .update({ body: newClass.ecred })
            .eq('sid', newClass.esid)
            .eq('cid', classNow.id);


        if (err2) console.log(err2)
        else throw redirect(303, `/trainerverified/runningclass/${classNow.id}/credentials`);

    },
}