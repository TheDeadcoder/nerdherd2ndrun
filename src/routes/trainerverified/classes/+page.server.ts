import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

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

    let { data: classes, error } = await supabase
        .from('classes')
        .select("*")

        .eq('teacherid', teacher[0].id)

    const classesWithPending = await Promise.all(
        classes.map(async (classItem) => {
            let { data: studclass, error: pendingError } = await supabase
                .from('studclass')
                .select("*")
                .eq('cid', classItem.id);

            if (pendingError) {
                console.error(pendingError.message);
                // Handle the error as you see fit
            }

            for (let i = 0; i < studclass?.length; i++) {

                let { data: tempStudent, error: pendingError } = await supabase
                    .from('student')
                    .select("*")
                    .eq('id', studclass[i].sid);

                let studentInfo = tempStudent[0];
                studclass[i].student = studentInfo;
            }

            // Attach pendingclass data to classItem
            return {
                ...classItem,
                studclass // This adds the pendingclass array to each classItem
            };
        }
        ));

    return { teacher, classes: classesWithPending };




}
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

export const actions = {
    upload: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let name = newClass.title + "_" + teacherNow.id;

        if (newClass.image.size) {

            const { data: res, error: err } = await supabase.storage
                .from('classimg')
                .upload(name, newClass.image, {
                    cacheControl: '3600',
                    upsert: false
                });


            const { data: link } = await supabase
                .storage
                .from('classimg')
                .getPublicUrl(name)


            // console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('classes')
                .insert([
                    { teacherid: teacherNow.id, syllabus: newClass.syllabus, duration: newClass.duration.toString(), start: formatDate(newClass.start), image: link.publicUrl, title: newClass.title }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('classes')
                .insert([
                    { teacherid: teacherNow.id, syllabus: newClass.syllabus, duration: newClass.duration.toString(), start: formatDate(newClass.start), title: newClass.title }
                ])


            if (err1) console.log(err1)

        }




        // console.log(err, link)



        throw redirect(303, '/trainerverified/classes');
    },
    deleteRequest: async ({ url, locals: { supabase, getSession } }) => {
        const requestid = url.searchParams.get("id")
        console.log("ami request delete korte chai ", requestid);

        if (!requestid) {
            return fail(400, { message: "Invalid request" })
        }

        const { error: err } = await supabase
            .from('studclass')
            .delete()
            .eq("id", requestid)

        if (err) console.log(err)
        else throw redirect(303, '/trainerverified/classes');

    },
    ApproveRequest: async ({ url, locals: { supabase, getSession } }) => {
        const requestid = url.searchParams.get("id")
        console.log("ami request approve korte chai ", requestid);

        if (!requestid) {
            return fail(400, { message: "Invalid request" })
        }


        const { data, error: err } = await supabase
            .from('studclass')
            .update({ joined: true })
            .eq("id", requestid)


        if (err) return fail(400, { message: "Invalid request" })
        else throw redirect(303, '/trainerverified/classes');

    },

}



