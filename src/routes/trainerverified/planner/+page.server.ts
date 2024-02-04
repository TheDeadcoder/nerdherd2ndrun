import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';



export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();



    let { data: todo, error: err } = await supabase
        .from('todo')
        .select("*")
        .eq('email', user.email)


    console.log(err);
    return { todo }
}