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



    let { data: studclass, error: err2 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)
        .eq('joined', true)

    return { classNow, studclass, teacherNow, classlive };

}
export const actions = {

    addLive: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)


        const { data: dtt, error: err1 } = await supabase
            .from('classlive')
            .insert([
                { classid: classNow.id, start: newClass.start, topic: newClass.topic },
            ])
            .select()

        if (err1) console.log(err1)



        throw redirect(303, `/trainerverified/runningclass/${classNow.id}/live`);
    },
    edit: async ({ request, locals: { supabase, getSession } }) => {

        const data = await request.formData();

        let newClass = Object.fromEntries(data.entries()) as any;
        //console.log(newClass.studid, newClass.score);

        //console.log(newClass.sid, newClass.cred);
        const { data: dtx, error: err2 } = await supabase
            .from('attendance')
            .update({ score: newClass.score })
            .eq('id', newClass.studid);

        if (err2) console.log(err2)
        else throw redirect(303, `/trainerverified/runningclass/${classNow.id}/live`);

    },



}