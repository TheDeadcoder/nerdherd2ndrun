import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let studentNow;
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
            .eq('pbcid', contestItem.id)

        //let contestEndTime = calculateContestEndTime(contestItem);
        pbregistrant.sort((a, b) => b.score - a.score);

        for (let j = 0; j < pbregistrant?.length; j++) {
            let { data: student, error: err33 } = await supabase
                .from('student')
                .select("*")
                .eq('id', pbregistrant[j].sid);

            pbregistrant[j].student = student[0];
        }

        return {
            ...contestItem,
            pbregistrant
        };
    }));

    contestNow = contestWithInfo[0];

    if (contestNow.pbregistrant) {

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
export const actions = {

    register: async ({ url, locals: { supabase, getSession } }) => {
        const contestid = url.searchParams.get("id")
        //console.log("ami todo delete korte chai ", todoid);

        if (!contestid) {
            return fail(400, { message: "Invalid request" })
        }


        const { data, error: err2 } = await supabase
            .from('pbregistrant')
            .insert([
                { pbcid: contestid, sid: studentNow.id },
            ]);



        if (err2) console.log(err2)
        else throw redirect(303, '/learnerverified/contest');

    },


}