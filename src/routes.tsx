import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refunds from "./pages/Refunds";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { getAllPostSlugs } from "./lib/blog";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, element: <Home />, entry: "src/pages/Home.tsx" },
      { path: "privacy", element: <Privacy />, entry: "src/pages/Privacy.tsx" },
      { path: "terms", element: <Terms />, entry: "src/pages/Terms.tsx" },
      { path: "refunds", element: <Refunds />, entry: "src/pages/Refunds.tsx" },
      { path: "contact", element: <Contact />, entry: "src/pages/Contact.tsx" },
      { path: "blog", element: <Blog />, entry: "src/pages/Blog.tsx" },
      {
        path: "blog/:slug",
        element: <BlogPost />,
        entry: "src/pages/BlogPost.tsx",
        getStaticPaths: () => getAllPostSlugs().map((slug) => `blog/${slug}`),
      },
    ],
  },
];
