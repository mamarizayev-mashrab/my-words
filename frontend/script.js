async function getData() {
    const res = await fetch("https://YOUR-BACKEND.onrender.com/");
    const data = await res.json();
    document.getElementById("result").textContent = JSON.stringify(data);
}
