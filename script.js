// 🔑 Replace with your Supabase details
const supabaseUrl = "https://njnymvxiestqsyfyicyq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qbnltdnhpZXN0cXN5ZnlpY3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwOTc5MTUsImV4cCI6MjA5NjY3MzkxNX0.3giNHgMSSroVZc2D68mMn2jDnpbGuisMN-0ghMOXOu0";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// SUBMIT FEEDBACK
async function submitFeedback() {
  const name = document.getElementById("name").value;
  const dept = document.getElementById("dept").value;
  const rating = document.getElementById("rating").value;
  const message = document.getElementById("message").value;

  const { error } = await supabase
    .from("feedback")
    .insert([{ name, department: dept, rating, message }]);

  if (error) {
    alert("Error submitting feedback");
    console.log(error);
  } else {
    alert("Feedback submitted!");
  }
}

// LOAD FEEDBACK
async function loadFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("id", { ascending: false });

  let html = "";

  data.forEach(f => {
    html += `
      <tr>
        <td>${f.name}</td>
        <td>${f.department}</td>
        <td>${f.rating}</td>
        <td>${f.message}</td>
      </tr>
    `;
  });

  document.getElementById("tableBody").innerHTML = html;
}