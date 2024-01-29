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
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const content1 = formData.get('content');

        const timetoread = formData.get('timetoread') as string;
        const tags = formData.get('tags') as string;
        let timestamp = new Date();

        // const session = await getSession()
        console.log(title, description, content1, timetoread, tags);


        const { data, error } = await supabase
            .from('blog')
            .insert([
                { some_column: 'someValue', other_column: 'otherValue' },
            ])
            .select()

        const {
            data: { user }
        } = await supabase.auth.getUser();

        let { data: teacher, error: err } = await supabase
            .from('teacher')
            .select("*")
            .eq('email', user.email)


        const { data: dtt, error: err1 } = await supabase
            .from('blog')
            .insert([
                { teacherid: teacher[0].id, createdat: timestamp, title: title, description: description, content: content1, timetoread: timetoread, tags: tags },
            ])

        console.log(err1);


        throw redirect(303, '/trainerverified/home/my');
    },

}

