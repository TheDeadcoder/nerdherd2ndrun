import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let teacherNow;
export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log(user);


  let { data: teacher, error: err1 } = await supabase
    .from('teacher')
    .select("*")
    .eq('email', user?.email)
  console.log(err1);
  teacherNow = teacher[0];



  let { data: book, error: err } = await supabase
    .from('book')
    .select('*')

  console.log(err);




  let tagsToBooksMap = {};
  let uniqueTags = []; // Array to hold unique tags

  book.forEach(currbook => {
    let values = currbook.tags;
    values.forEach(tag => {
      let trimmedTag = tag.trim();
      // Check if the tag is not already in the uniqueTags array before adding it
      if (!uniqueTags.includes(trimmedTag)) {
        uniqueTags.push(trimmedTag);
      }
      if (!tagsToBooksMap[trimmedTag]) {
        tagsToBooksMap[trimmedTag] = []; // Initialize the array if the tag is encountered for the first time
      }
      // Add the book to the array associated with the tag
      tagsToBooksMap[trimmedTag].push(currbook);
    });
  });






  return { tagsToBooksMap, teacherNow, uniqueTags }
}

export const actions = {
  upload: async ({ request, locals: { supabase, getSession } }) => {

    const data = await request.formData();


    let newBook = Object.fromEntries(data.entries()) as any;

    let name = newBook.title + "_" + teacherNow.name;
    let name1 = newBook.title + "_img" + teacherNow.name;

    // //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    const { data: res, error: err } = await supabase.storage
      .from('bookstore')
      .upload(name, newBook.content, {
        cacheControl: '3600',
        upsert: false
      });

    console.log("err:", err);

    const { data: link } = await supabase
      .storage
      .from('bookstore')
      .getPublicUrl(name)

    console.log(link);

    const { data: res1, error: err1 } = await supabase.storage
      .from('bookcover')
      .upload(name1, newBook.coverimg, {
        cacheControl: '3600',
        upsert: false
      });


    const { data: link1 } = await supabase
      .storage
      .from('bookcover')
      .getPublicUrl(name1)


    console.log("err:", err1);

    const { data: dt, error: err2 } = await supabase
      .from('book')
      .insert([
        { teacherid: teacherNow.id, title: newBook.title, author: newBook.author.split(','), edition: newBook.edition, coverimg: link1.publicUrl, tags: newBook.tags.split(','), content: link.publicUrl, price: newBook.price }
      ])


    console.log("err:", err2);


    throw redirect(303, '/trainerverified/library');
  },
}