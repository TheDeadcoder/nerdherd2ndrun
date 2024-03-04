import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let umail;

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();

    umail = user?.email;

    let { data: todo, error: err } = await supabase
        .from('todo')
        .select("*")
        .eq('email', user?.email)


    console.log(err);
    return { todo }
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
        const formData = await request.formData();
        //console.log("amar form holo", formData);
        const taskname = formData.get('taskname') as string;
        const description = formData.get('description') as string;
        const deadline = formatDate(formData.get('deadline')) as string;
        const importancescale = formData.get('importancescale') as string;

        // console.log("form", umail, taskname, description, deadline, importancescale)

        const { data, error: err } = await supabase
            .from('todo')
            .insert([
                { email: umail, taskname: taskname, description: description, deadline: deadline, importancescale: importancescale },
            ])
            .select()

        if (err) console.log(err)

        else throw redirect(303, '/learnerverified/planner');
    },
    deleteTodo: async ({ url, locals: { supabase, getSession } }) => {
        const todoid = url.searchParams.get("id")
        console.log("ami todo delete korte chai ", todoid);

        if (!todoid) {
            return fail(400, { message: "Invalid request" })
        }

        const { error: err } = await supabase
            .from('todo')
            .delete()
            .eq("id", todoid)

        if (err) console.log(err)
        else throw redirect(303, '/learnerverified/planner');

    },
    updateTodo: async ({ url, locals: { supabase, getSession } }) => {
        const todoid = url.searchParams.get("id")
        console.log("ami todo Update korte chai ", todoid);

        if (!todoid) {
            return fail(400, { message: "Invalid request" })
        }


        const { data, error: err } = await supabase
            .from('todo')
            .update({ status: true })
            .eq("id", todoid)


        if (err) return fail(400, { message: "Invalid request" })
        else throw redirect(303, '/learnerverified/planner');

    },

}