import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let studentNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.sid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }


    let { data: student, error: err } = await supabase
        .from('student')
        .select("*")
        .eq('id', params.sid)


    studentNow = student[0];


    let { data: studentqual, error } = await supabase
        .from('studentqual')
        .select("*")
        .eq('studentid', studentNow.id)

    let { data: performance, error: err7 } = await supabase
        .from('performance')
        .select("*")
        .eq('sid', studentNow.id);

    const performanceWithContest = await Promise.all(performance.map(async (performanceItem) => {
        let { data: contest, error: pendingError } = await supabase
            .from('pbcontest')
            .select("*")
            .eq('id', performanceItem.cid);

        performanceItem.contest = contest[0];


        // Attach pendingclass data to classItem
        return {
            ...performanceItem,
        };
    }));





    return { studentNow, studentqual, performanceWithContest };

}