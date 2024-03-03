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



    let { data: classnote, error: err5 } = await supabase
        .from('classnote')
        .select("*")
        .eq('cid', classNow.id);


    const notes = await Promise.all(classnote.map(async (noteItem) => {
        let { data: dttt, error: pendingError } = await supabase
            .from('commonuser')
            .select("*")
            .eq('id', noteItem.owner);

        let temp = dttt[0];
        let userNow;

        if (temp.istrainer) {
            let { data: dteacher, error: pendingError } = await supabase
                .from('teacher')
                .select("*")
                .eq('id', temp.id);

            userNow = dteacher[0];
        }
        else {
            let { data: dstudent, error: pendingError } = await supabase
                .from('student')
                .select("*")
                .eq('id', temp.id);

            userNow = dstudent[0];
        }




        // Attach pendingclass data to classItem
        return {
            ...noteItem,
            userNow // This adds the pendingclass array to each classItem
        };
    }));

    return { classNow, teacherNow, notes };

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




        const { data: dt, error: err1 } = await supabase
            .from('classnote')
            .insert([
                { owner: teacherNow.id, cid: classNow.id, lang: newClass.lang, title: newClass.title }
            ])


        if (err1) console.log(err1)

        else throw redirect(303, `/trainerverified/runningclass/${classNow.id}/notes`);
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