import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let studentNow;
let contestNow;

function calculateContestEndTime(contestNow) {
    const startTime = new Date(contestNow.start).getTime(); // Convert start time to milliseconds
    const durationMilliseconds = contestNow.duration * 60000; // Convert duration from minutes to milliseconds
    return new Date(startTime + durationMilliseconds);
}

export const load = async ({ params, locals: { supabase, getSession } }) => {
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




    let { data: pbcontest, error: err2 } = await supabase
        .from('pbcontest')
        .select("*")
        .eq('id', params.contestid);


    const contestWithInfo = await Promise.all(pbcontest.map(async (contestItem) => {

        let { data: pbregistrant, error: err33 } = await supabase
            .from('pbregistrant')
            .select("*")
            .eq('sid', studentNow.id)
            .eq('pbcid', contestItem.id)

        let contestEndTime = calculateContestEndTime(contestItem);
        let registrant;
        if (pbregistrant.length > 0) {
            registrant = pbregistrant[0];
        }
        return {
            ...contestItem,
            registrant,
            contestEndTime
        };
    }));

    contestNow = contestWithInfo[0];

    if (contestNow.registrant) {

        let { data: questions, error } = await supabase
            .from('questions')
            .select("*")
            .eq('pcid', contestNow.id)

        return { contestNow, studentNow, questions };
    }
    else {
        throw redirect(303, '/learnerverified/contest');
    }
}
