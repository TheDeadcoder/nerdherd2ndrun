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


    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)

    classNow = classes[0];

    let { data: teacher, error: err3 } = await supabase
        .from('teacher')
        .select("*")
        .eq('id', classes[0].teacherid)

    teacherNow = teacher[0];

    let { data: studclass, error: err2 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)
        .eq('joined', true)


    let { data: assignment, error } = await supabase
        .from('assignment')
        .select("*")
        .eq('cid', params.classid)



    return { classNow, studclass, teacherNow, assignment };

}
export const actions = {
    addAssignment: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;
        let timeNow = new Date();
        let name = teacherNow.id + "_" + timeNow;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.question.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('assignments')
                .upload(name, newClass.question, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('assignments')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('assignment')
                .insert([
                    { cid: classNow.id, title: newClass.title, deadline: newClass.deadline, question: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }


        throw redirect(303, `/trainerverified/runningclass/${classNow.id}/assignments`);
    },

    addSkill: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;


        const { data: dt, error: err1 } = await supabase
            .from('teacherskills')
            .insert([
                { teacherid: teacherNow.id, body: newClass.skillsbody }
            ])


        if (err1) console.log(err1)


        throw redirect(303, '/trainerverified/profile');
    },
    addPic: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;
        let timeNow = new Date();
        let name = teacherNow.id + "_" + timeNow;



        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.pic.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('userpics')
                .upload(name, newClass.pic, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('userpics')
                .getPublicUrl(name)


            console.log(err, link)
            console.log("okk")


            const { data, error: err1 } = await supabase
                .from('teacher')
                .update({ image: link.publicUrl })
                .eq('id', teacherNow.id)



            if (err1) console.log(err1)

        }

        throw redirect(303, '/trainerverified/profile');
    },

    addBio: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('teacher')
            .update({ bio: newClass.bio })
            .eq('id', teacherNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/trainerverified/profile');
    },
    addAbout: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('teacher')
            .update({ about: newClass.about })
            .eq('id', teacherNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/trainerverified/profile');
    },

    addDob: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('teacher')
            .update({ dob: newClass.dob })
            .eq('id', teacherNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/trainerverified/profile');
    },
    addGender: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('teacher')
            .update({ gender: newClass.gender })
            .eq('id', teacherNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/trainerverified/profile');
    },
    addAddress: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('teacher')
            .update({ address: newClass.address })
            .eq('id', teacherNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/trainerverified/profile');
    },



}