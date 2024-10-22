import axios from "axios";
import { IconBrandGoogle } from "@tabler/icons-react";

const Page = async ({ params }: { params: { id: string } }) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
  );
  const post = res.data;
  return (
    <div>
      My Post: {params.id}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <IconBrandGoogle className="size-4 text-foreground" />
    </div>
  );
};

export default Page;
