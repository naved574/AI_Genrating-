import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { Blog } from "@/data/mock";

export function BlogPost({ post }: { post: Blog }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Link to="/blogs" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft className="size-3.5" /> Back to blog
      </Link>
      <p className="text-xs uppercase tracking-widest text-accent mb-3">{post.category}</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
      <div className="flex items-center gap-3 mb-10">
        <img src={post.author.avatar} className="size-9 rounded-full" alt="" />
        <div>
          <p className="text-sm font-medium">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">{post.publishedAt} · {post.readTime}</p>
        </div>
      </div>
      <img src={post.cover} alt="" className="w-full aspect-[16/9] object-cover rounded-2xl border border-border mb-10" />
      <div className="prose prose-invert max-w-none space-y-5 text-muted-foreground leading-relaxed">
        <p>{post.excerpt}</p>
        <p>This is a sample post. In a real Luminal deployment, this body would be rendered from your CMS, with MDX support, code blocks, embedded prompts, and inline image generations.</p>
        <p>Every paragraph here is intentionally readable — we believe great editorial work is part of what makes a creative product feel alive.</p>
        <h2 className="text-2xl font-bold text-foreground pt-4">Why this matters</h2>
        <p>The shift from "describe" to "direct" is the most important UX change in this generation of AI tools. We'll cover what that means in practice and how Luminal's model stack supports it.</p>
      </div>
    </article>
  );
}
