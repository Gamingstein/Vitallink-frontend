import axios from "axios";
import { IconBrandGoogle } from "@tabler/icons-react";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
  );
  const post = await res.data;
  return (
    <div className="flex justify-center items-center flex-col h-full">
      My Post: {params.id}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <IconBrandGoogle className="size-4 text-foreground" />
    </div>
  );
};

export default Page;
