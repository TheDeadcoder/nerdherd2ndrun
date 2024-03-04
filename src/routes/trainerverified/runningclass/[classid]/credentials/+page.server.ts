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



        let { data: credentials, error: crederror } = await supabase
            .from('credentials')
            .select("*")
            .eq('sid', studItem.student.id);


        // Attach pendingclass data to classItem
        return {
            ...studItem,
            credentials
        };
    }));

    return { classNow, studentwithCred };

}

export const actions = {
    add: async ({ url, request, locals: { supabase, getSession } }) => {
        const studentid = url.searchParams.get("id");
        const data = await request.formData();

        let newClass = Object.fromEntries(data.entries()) as any;

        //console.log("ami todo delete korte chai ", todoid);

        if (!studentid) {
            return fail(400, { message: "Invalid request" })
        }
        const { data: dtx, error: err2 } = await supabase
            .from('credentials')
            .insert([
                { sid: studentid, cid: classNow.id, body: newClass.cred },
            ]);

        if (err2) console.log(err2)
        else throw redirect(303, `/trainerverified/runningclass/${classNow.id}/credentials`);

    },
}