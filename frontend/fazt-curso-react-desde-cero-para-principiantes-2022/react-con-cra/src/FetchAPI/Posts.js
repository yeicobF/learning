export const Posts = () => {
  const handleClick = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    // https://twitter.com/midudev/status/1568954089110732800?s=20&t=rIE8z_7s6D33RLVekt-zxw
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const posts = await res.json();
    console.log(posts);

    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  };
  return <button onClick={handleClick}>Traer datos</button>;
};
