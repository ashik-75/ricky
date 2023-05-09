import { sleep } from "@/utils/sleep";
import Link from "next/link";
import { posts } from "./data";

async function getPost() {
  await sleep(2000);
  return posts;
}

async function HomePage() {
  const posts = await getPost();
  return (
    <div>
      {posts.map((p: any) => (
        <Link className="block" href={`/${p.id}`} key={p.id}>
          {p.title}
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
