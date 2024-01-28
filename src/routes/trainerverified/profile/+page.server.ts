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
    //console.log(user);


    let { data: teacher, error: err } = await supabase
        .from('teacher')
        .select("*")
        .eq('email', user.email)


    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('teacherid', teacher[0].id)

    return { teacher, blog }
}
export const actions = {
    update: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        console.log(formData);
        // const fullName = formData.get('fullName') as string
        // const username = formData.get('username') as string
        // const website = formData.get('website') as string
        // const avatarUrl = formData.get('avatarUrl') as string

        // const session = await getSession()

        // const { error } = await supabase.from('profiles').upsert({
        //     id: session?.user.id,
        //     full_name: fullName,
        //     username,
        //     website,
        //     avatar_url: avatarUrl,
        //     updated_at: new Date()
        // })

        // if (error) {
        //     return fail(500, {
        //         fullName,
        //         username,
        //         website,
        //         avatarUrl
        //     })
        // }

        // return {
        //     fullName,
        //     username,
        //     website,
        //     avatarUrl
        // }
    },
}

