import { createFileRoute, notFound } from "@tanstack/react-router";
import { mockBlogs } from "@/data/mock";
import { BlogPost } from "@/pages/site/BlogPost";

export const Route = createFileRoute("/_site/blog/$slug")({
  loader: ({ params }) => {
    const post = mockBlogs.find((b) => b.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  errorComponent: ({ error }) => <div className="p-12">Couldn't load: {error.message}</div>,
  notFoundComponent: () => <div className="p-12">Post not found.</div>,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Luminal` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.cover },
        ]
      : [],
  }),
  component: () => {
    const { post } = Route.useLoaderData();
    return <BlogPost post={post} />;
  },
});
