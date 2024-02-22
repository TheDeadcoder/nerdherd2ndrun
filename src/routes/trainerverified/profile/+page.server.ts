import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

let teacherNow;
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


    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('teacherid', teacher[0].id)
        .limit(2)


    let { data: classes, error: err5 } = await supabase
        .from('classes')
        .select("*")
        .eq('teacherid', teacher[0].id)


    let { data: teacherqual, error: err6 } = await supabase
        .from('teacherqual')
        .select("*")
        .eq('teacherid', teacherNow.id)

    let { data: teacherskills, error: err7 } = await supabase
        .from('teacherskills')
        .select("*")
        .eq('teacherid', teacherNow.id)



    return { teacherNow, blog, classes, teacherqual, teacherskills }
}
export const actions = {
    addWorkExperiences: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let name = teacherNow.id + "_" + newClass.WorkExperiencesInstitute;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.WorkExperiencesImage.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('workExperiences')
                .upload(name, newClass.WorkExperiencesImage, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('workExperiences')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('teacherqual')
                .insert([
                    { teacherid: teacherNow.id, from: newClass.WorkExperiencesFrom.toString(), to: newClass.WorkExperiencesTo.toString(), institute: newClass.WorkExperiencesInstitute, name: newClass.WorkExperiencesPosition, image: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('teacherqual')
                .insert([
                    { teacherid: teacherNow.id, from: newClass.WorkExperiencesFrom.toString(), to: newClass.WorkExperiencesTo.toString(), institute: newClass.WorkExperiencesInstitute, name: newClass.WorkExperiencesPosition }
                ])


            if (err1) console.log(err1)

        }



        throw redirect(303, '/trainerverified/profile');
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

