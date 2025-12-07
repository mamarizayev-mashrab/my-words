const API = "https://my-words.onrender.com";

async function getTest() {
  const res = await fetch(`${API}/`);
  const data = await res.json();
  document.getElementById("testResult").textContent = data.message;
}

async function loadWords() {
  const res = await fetch(`${API}/words`);
  const data = await res.json();

  const list = document.getElementById("wordsList");
  list.innerHTML = "";
  data.forEach(w => {
    const li = document.createElement("li");
    li.textContent = w.text;
    list.appendChild(li);
  });
}

async function addWord() {
  const text = document.getElementById("wordInput").value;
  if (!text) return;

  await fetch(`${API}/words`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  document.getElementById("wordInput").value = "";
  loadWords();
}
