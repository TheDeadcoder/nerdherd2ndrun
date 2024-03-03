import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let teacherNow;
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


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('email', user.email)

    teacherNow = teacher[0];

    let { data: pbcontest, error: err2 } = await supabase
        .from('pbcontest')
        .select('*')
        .eq('teacherid', teacherNow.id)


    const contestwithRegistrants = await Promise.all(pbcontest.map(async (contestItem) => {

        let { data: pbregistrant, error } = await supabase
            .from('pbregistrant')
            .select("*")
            .eq('pbcid', contestItem.id)

        let registrants = pbregistrant;
        let countdown = -1;
        let contestEndTime = calculateContestEndTime(contestItem);

        // Attach pendingclass data to classItem
        return {
            ...contestItem, countdown, contestEndTime,
            registrants // This adds the pendingclass array to each classItem
        };
    }));

    console.log(err);
    return { contestwithRegistrants, teacherNow }
}

export const actions = {
    addContest: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let timeNow = new Date();
        let name = teacherNow.id + "_" + timeNow;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.image.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('contestcover')
                .upload(name, newClass.image, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('contestcover')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('pbcontest')
                .insert([
                    { teacherid: teacherNow.id, title: newClass.title, topic: newClass.topic, start: newClass.start, image: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('pbcontest')
                .insert([
                    { teacherid: teacherNow.id, title: newClass.title, topic: newClass.topic, start: newClass.start }
                ])


            if (err1) console.log(err1)

        }



        throw redirect(303, '/trainerverified/contest');
    },

    // addSkill: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;


    //     const { data: dt, error: err1 } = await supabase
    //         .from('teacherskills')
    //         .insert([
    //             { teacherid: teacherNow.id, body: newClass.skillsbody }
    //         ])


    //     if (err1) console.log(err1)


    //     throw redirect(303, '/trainerverified/profile');
    // },
    // addPic: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;
    //     let timeNow = new Date();
    //     let name = teacherNow.id + "_" + timeNow;



    //     //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    //     if (newClass.pic.size) {
    //         // console.log(newClass.image);
    //         const { data: res, error: err } = await supabase.storage
    //             .from('userpics')
    //             .upload(name, newClass.pic, {
    //                 cacheControl: '3600',
    //                 upsert: false
    //             });

    //         const { data: link } = await supabase
    //             .storage
    //             .from('userpics')
    //             .getPublicUrl(name)


    //         console.log(err, link)
    //         console.log("okk")


    //         const { data, error: err1 } = await supabase
    //             .from('teacher')
    //             .update({ image: link.publicUrl })
    //             .eq('id', teacherNow.id)



    //         if (err1) console.log(err1)

    //     }

    //     throw redirect(303, '/trainerverified/profile');
    // },

    // addBio: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;




    //     //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    //     const { data: dtt, error: err1 } = await supabase
    //         .from('teacher')
    //         .update({ bio: newClass.bio })
    //         .eq('id', teacherNow.id)



    //     if (err1) console.log(err1)



    //     throw redirect(303, '/trainerverified/profile');
    // },
    // addAbout: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;




    //     //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    //     const { data: dtt, error: err1 } = await supabase
    //         .from('teacher')
    //         .update({ about: newClass.about })
    //         .eq('id', teacherNow.id)



    //     if (err1) console.log(err1)



    //     throw redirect(303, '/trainerverified/profile');
    // },

    // addDob: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;




    //     //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    //     const { data: dtt, error: err1 } = await supabase
    //         .from('teacher')
    //         .update({ dob: newClass.dob })
    //         .eq('id', teacherNow.id)



    //     if (err1) console.log(err1)



    //     throw redirect(303, '/trainerverified/profile');
    // },
    // addGender: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;




    //     //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    //     const { data: dtt, error: err1 } = await supabase
    //         .from('teacher')
    //         .update({ gender: newClass.gender })
    //         .eq('id', teacherNow.id)



    //     if (err1) console.log(err1)



    //     throw redirect(303, '/trainerverified/profile');
    // },
    // addAddress: async ({ request, locals: { supabase, getSession } }) => {
    //     const data = await request.formData();
    //     //console.log("amar add class form holo", data);

    //     let newClass = Object.fromEntries(data.entries()) as any;




    //     //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    //     const { data: dtt, error: err1 } = await supabase
    //         .from('teacher')
    //         .update({ address: newClass.address })
    //         .eq('id', teacherNow.id)



    //     if (err1) console.log(err1)



    //     throw redirect(303, '/trainerverified/profile');
    // },



}