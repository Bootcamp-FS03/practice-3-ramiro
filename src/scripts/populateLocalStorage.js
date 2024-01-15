function populateLocalStorage() {
  const users = [
    { username: "ramiro", password: "password", email: "ramiro@example.com" },
    { username: "maria", password: "password", email: "maria@example.com" },
  ];

  const posts = [
    {
      username: "ramiro",
      content: "here is my cat!",
      image: "http://placekitten.com/200/300",
      timestamp: 1705335002353,
    },
    {
      username: "ramiro",
      content: "hello there!",
      image: "",
      timestamp: 1705335002352,
    },
    {
      username: "maria",
      content: "hello world",
      image: "",
      timestamp: 1705335002351,
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("posts", JSON.stringify(posts));
}

populateLocalStorage();

console.log("Data loaded into localStorage.");
