const API = "https://my-words.onrender.com";

// Backend test
async function getTest() {
  const res = await fetch(`${API}/`);
  const data = await res.json();
  document.getElementById("result").textContent = data.message;
}

// Barcha so'zlarni olish
async function loadWords() {
  const res = await fetch(`${API}/words`);
  const data = await res.json();

  const list = document.getElementById("wordsList");
  list.innerHTML = "";
  data.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word.text;
    list.appendChild(li);
  });
}

// So'z qo'shish
async function addWord() {
  const text = document.getElementById("wordInput").value;
  if (!text) return;

  await fetch(`${API}/words`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text })
  });

  document.getElementById("wordInput").value = "";
  loadWords();
}
