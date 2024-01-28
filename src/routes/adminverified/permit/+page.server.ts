import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }


    let { data: pendingrequest, error } = await supabase
        .from('pendingrequest')
        .select('*')


    return { pendingrequest }
}

