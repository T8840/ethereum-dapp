
// console.log("output:------------",data)
// This error occurs because the import statement is being used outside of a module. To fix this, make sure that the file containing the import statement is a module by either using the "type=module" attribute in the script tag or by using a module bundler like webpack.
const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )
const supabaseUrl = 'https://oedflxbhoyspyrcsxdkd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZGZseGJob3lzcHlyY3N4ZGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2MjQ5NDEsImV4cCI6MTk5NTIwMDk0MX0.FsH8H0frQFAx_KU5WnAy_NFenSdsnlKXglzO-ndMVzs"
const supabase = createClient(supabaseUrl, supabaseKey)


async function getStudentData() {
  let { data } = await supabase
    .from('test')
    .select('*')
  return data
}

getStudentData().then(data => console.log(data))
