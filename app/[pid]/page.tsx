import { Metadata } from "next";
import { posts } from "../data";

async function getPostFromParams(pid: string) {
  const post = posts.find((p) => p.id === Number(pid));

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { pid: string };
}): Promise<Metadata> {
  const post = await getPostFromParams(params.pid);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: `it contains ${post.title}`,
  };
}

async function getPost(pid: string) {
  return posts.find((p) => p.id === Number(pid));
}

async function PostDetails({ params }: { params: { pid: string } }) {
  const post = await getPostFromParams(params.pid);
  return (
    <div>
      <pre>{JSON.stringify(post)}</pre>
    </div>
  );
}

export default PostDetails;
