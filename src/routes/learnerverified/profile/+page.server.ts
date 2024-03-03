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

let studentNow;
export const load = async ({ locals: { supabase, getSession } }) => {
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



    let { data: studentqual, error: err6 } = await supabase
        .from('studentqual')
        .select("*")
        .eq('studentid', studentNow.id)



    return { studentNow, studentqual }
}
export const actions = {
    addWorkExperiences: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let name = studentNow.id + "_" + newClass.WorkExperiencesInstitute;

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
                .from('studentqual')
                .insert([
                    { studentid: studentNow.id, from: newClass.WorkExperiencesFrom.toString(), to: newClass.WorkExperiencesTo.toString(), institute: newClass.WorkExperiencesInstitute, name: newClass.WorkExperiencesPosition, gpa: newClass.WorkExperiencesgpa, gpabase: newClass.WorkExperiencesgpabase, image: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('studentqual')
                .insert([
                    { studentid: studentNow.id, from: newClass.WorkExperiencesFrom.toString(), to: newClass.WorkExperiencesTo.toString(), institute: newClass.WorkExperiencesInstitute, name: newClass.WorkExperiencesPosition, gpa: newClass.WorkExperiencesgpa, gpabase: newClass.WorkExperiencesgpabase }
                ])


            if (err1) console.log(err1)

        }



        throw redirect(303, '/learnerverified/profile');
    },


    addPic: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;
        let timeNow = new Date();
        let name = studentNow.id + "_" + timeNow;



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
                .from('student')
                .update({ image: link.publicUrl })
                .eq('id', studentNow.id)



            if (err1) console.log(err1)

        }

        throw redirect(303, '/learnerverified/profile');
    },


    addAbout: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('student')
            .update({ about: newClass.about })
            .eq('id', studentNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/learnerverified/profile');
    },


    addPhone: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('student')
            .update({ mobile: newClass.phone })
            .eq('id', studentNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/learnerverified/profile');
    },

    addDob: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('student')
            .update({ dob: newClass.dob })
            .eq('id', studentNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/learnerverified/profile');
    },
    addGender: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('student')
            .update({ gender: newClass.gender })
            .eq('id', studentNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/learnerverified/profile');
    },
    addAddress: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('student')
            .update({ address: newClass.address })
            .eq('id', studentNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/learnerverified/profile');
    },
    addInstitute: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('student')
            .update({ institute: newClass.institute })
            .eq('id', studentNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/learnerverified/profile');
    },



}

