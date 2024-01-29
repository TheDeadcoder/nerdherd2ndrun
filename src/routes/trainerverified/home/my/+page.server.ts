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
    upload: async ({ request, locals: { supabase, getSession } }) => {
        console.log("ami blog form e asi");
        const formData = await request.formData()
        // const title = formData.get('fullName') as string
        // const description = formData.get('username') as string
        // const content = formData.get('website') as string
        // const timetoread = formData.get('avatarUrl') as string
        // const tags = formData.get('avatarUrl') as string

        // const session = await getSession()
        console.log(formData);

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

        throw redirect(303, '/trainerverified/home/my');
    },

}

