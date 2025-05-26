// 1. Збереження інформації
const info = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language
  };
  localStorage.setItem("userInfo", JSON.stringify(info));
  const footer = document.getElementById("footerInfo");
  footer.textContent = `OS: ${info.platform}, Browser: ${info.userAgent}, Language: ${info.language}`;
  
  // 2. Завантаження коментарів
  fetch("https://jsonplaceholder.typicode.com/posts/7/comments")
  .then(res => res.json())
  .then(comments => {
      const section = document.createElement("section");
      section.id = "comments-section";
      section.innerHTML = "<h2>Коментарі</h2>";

      comments.forEach(comment => {
          const div = document.createElement("div");
          div.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<p>${comment.body}</p>`;
          section.appendChild(div);
      });
      document.body.appendChild(section);
  })
  .catch(error => console.error("Помилка завантаження коментарів:", error));

  // 3. Модальне вікно через 1хв
  setTimeout(() => {
    document.getElementById("modal").style.display = "flex";
  }, 60000);
  
  // 4. Перемикач теми
  const themeToggleBtn = document.getElementById("themeToggle");
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "Light Theme"
      : "Dark Theme";
  });
  
  // 5. Автоматична нічна тема
  const hour = new Date().getHours();
  if (hour < 7 || hour >= 21) {
    document.body.classList.add("dark-mode");
    themeToggleBtn.textContent = "Light Theme";
  }