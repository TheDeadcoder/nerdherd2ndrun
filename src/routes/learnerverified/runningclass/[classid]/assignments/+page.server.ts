import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
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



    let { data: assignment, error } = await supabase
        .from('assignment')
        .select("*")
        .eq('cid', classNow.id);

    const assignmentwithSubmission = await Promise.all(assignment.map(async (assignmentItem) => {

        let { data: submissions, error } = await supabase
            .from('submissions')
            .select("*")
            .eq('aid', assignmentItem.id);

        assignmentItem.countdown = 0;
        assignmentItem.submission = submissions;
        // Attach pendingclass data to classItem
        return {
            ...assignmentItem,
        };
    }));


    return { classNow, assignmentwithSubmission, studentNow };

}

export const actions = {
    insertfrst: async ({ url, request, locals: { supabase, getSession } }) => {
        const assignmentid = url.searchParams.get("id");
        const data = await request.formData();

        let newClass = Object.fromEntries(data.entries()) as any;
        let timeNow = new Date();
        let name = studentNow.id + "_" + timeNow;
        //console.log("ami todo delete korte chai ", todoid);

        if (!assignmentid) {
            return fail(400, { message: "Invalid request" })
        }

        const { data: res, error: err1 } = await supabase.storage
            .from('submissions')
            .upload(name, newClass.file, {
                cacheControl: '3600',
                upsert: false
            });

        const { data: link } = await supabase
            .storage
            .from('submissions')
            .getPublicUrl(name)


        console.log(err1, link)

        const { data: dt, error: err2 } = await supabase
            .from('submissions')
            .insert([
                { sid: studentNow.id, aid: assignmentid, time: new Date(), body: link.publicUrl }
            ])


        if (err2) console.log(err2)



        else throw redirect(303, `/learnerverified/runningclass/${classNow.id}/assignments`);

    },
    update: async ({ url, request, locals: { supabase, getSession } }) => {
        const submissionId = url.searchParams.get("id");
        const data = await request.formData();

        let newClass = Object.fromEntries(data.entries()) as any;
        let timeNow = new Date();
        let name = studentNow.id + "_" + timeNow;
        //console.log("ami todo delete korte chai ", todoid);

        if (!submissionId) {
            return fail(400, { message: "Invalid request" })
        }

        const { data: res, error: err1 } = await supabase.storage
            .from('submissions')
            .upload(name, newClass.efile, {
                cacheControl: '3600',
                upsert: false
            });

        const { data: link } = await supabase
            .storage
            .from('submissions')
            .getPublicUrl(name)


        console.log(err1, link)


        const { data: dtx, error: err2 } = await supabase
            .from('submissions')
            .update({ body: link.publicUrl, time: new Date() })
            .eq('id', submissionId)
            .select()



        if (err2) console.log(err2)



        else throw redirect(303, `/learnerverified/runningclass/${classNow.id}/assignments`);

    },
}