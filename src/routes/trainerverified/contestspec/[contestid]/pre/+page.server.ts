import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let teacherNow;
let contestNow;
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

    let { data: pbcontest, error: err2 } = await supabase
        .from('pbcontest')
        .select('*')
        .eq('id', params.contestid)

    const contestwithRegistrants = await Promise.all(pbcontest.map(async (contestItem) => {

        let { data: pbregistrant, error } = await supabase
            .from('pbregistrant')
            .select("*")
            .eq('pbcid', contestItem.id)

        let registrants = pbregistrant;
        let countdown = -1;

        // Attach pendingclass data to classItem
        return {
            ...contestItem, countdown,
            registrants // This adds the pendingclass array to each classItem
        };
    }));
    contestNow = contestwithRegistrants[0];


    let { data: questions, error: err4 } = await supabase
        .from('questions')
        .select("*")
        .eq('pcid', contestNow.id);



    console.log(err);
    return { contestNow, teacherNow, questions }
}

export const actions = {
    addQuestion: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let timeNow = new Date();
        let name = teacherNow.id + "_" + timeNow;
        let options = [newClass.option1, newClass.option2, newClass.option3, newClass.option4];

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const tempo = newClass.time;

        let newDuration = contestNow.duration;
        newDuration += (tempo / 60) + (5 / 60);
        console.log(contestNow.duration, tempo, newDuration);

        if (newClass.image.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('questions')
                .upload(name, newClass.image, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('questions')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('questions')
                .insert([
                    { pcid: contestNow.id, body: newClass.body, correct: newClass.correct - 1, options: options, time: newClass.time, image: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('questions')
                .insert([
                    { pcid: contestNow.id, body: newClass.body, correct: newClass.correct - 1, options: options, time: newClass.time }
                ])


            if (err1) console.log(err1)

        }


        const { data: dtttt, error: er } = await supabase
            .from('pbcontest')
            .update({ duration: newDuration })
            .eq('id', contestNow.id);




        throw redirect(303, `/trainerverified/contestspec/${contestNow.id}/pre`);
    },

    editQuestion: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let timeNow = new Date();
        let name = teacherNow.id + "_" + timeNow;
        let options = [newClass.selectedoption1, newClass.selectedoption2, newClass.selectedoption3, newClass.selectedoption4];

        let newDuration = contestNow.duration + ((newClass.time + 5.0) / 60.0);

        if (newClass.selectedimage.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('questions')
                .upload(name, newClass.selectedimage, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('questions')
                .getPublicUrl(name)


            console.log(err, link)




            const { data, error: err1 } = await supabase
                .from('questions')
                .update({ body: newClass.selectedbody, correct: newClass.selectedcorrect - 1, options: options, time: newClass.selectedtime, image: link.publicUrl })
                .eq('id', newClass.selectedId);




            if (err1) console.log(err1)

        }
        else {

            const { data, error: err1 } = await supabase
                .from('questions')
                .update({ body: newClass.selectedbody, correct: newClass.selectedcorrect - 1, options: options, time: newClass.selectedtime })
                .eq('id', newClass.selectedId);


            if (err1) console.log(err1)

        }


        const { data: dt, error: er } = await supabase
            .from('pbcontest')
            .update({ duration: newDuration })
            .eq('id', contestNow.id);



        throw redirect(303, `/trainerverified/contestspec/${contestNow.id}/pre`);
    },




}