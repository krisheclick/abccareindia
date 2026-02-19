
import { BlogPageData } from '@/lib/api';


import BlogDescription from '@/components/blog/BlogDescription/BlogDescription';
import BlogList from '@/components/blog/BlogList/BlogList';
import PageHeader from '@/components/layout/PageHeader';



export default async function BlogPage() {
  const data = await BlogPageData();

  return (
    <>
    <PageHeader
        page_name={data.page.page_name}
        page_slug={data.page.page_slug}
        page_feature_image={data.page.page_feature_image}
      />
      <BlogDescription
        page_name={data.page.page_name}
        page_slug={data.page.page_slug}
        page_feature_image={data.page.page_feature_image}
        page_short_description={data.page.page_short_description}
        page_content={data.page.page_content}
      />

      <BlogList
        blogs={data.blogs}
        blogCategories={data.blogCategories}
      />
    </>
  );
}




// import React from "react";


// const Page = async () => {
//   const res = await fetch(
//     "https://abcindia.eclickprojects.com/api/v1/page/blog",
//     {
//       cache: "force-cache",
//       next: { revalidate: 60 },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch blogs");
//   }

//   const json = await res.json();

//   const page = json?.response_data?.page;
//   const blogs = json?.response_data?.blogs || [];
//   const categories = json?.response_data?.blogCategories || [];

//   return (
//     <section style={{ padding: "80px 5%" }}>
//       {/* PAGE HEADING */}
//       <div style={{ textAlign: "center", marginBottom: "50px" }}>
//         <h1>{page?.page_name}</h1>
//         <p>{page?.page_short_description}</p>
//       </div>

//       {/* ✅ CATEGORY LIST (NO CLICK) */}
//       <div
//         style={{
//           display: "flex",
//           gap: "12px",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           marginBottom: "60px",
//         }}
//       >
//         {categories.map((cat) => (
//           <span
//             key={cat.blog_category_id}
//             style={{
//               padding: "8px 18px",
//               borderRadius: "30px",
//               background: "#f2f2f2",
//               fontWeight: "600",
//               fontSize: "14px",
//             }}
//           >
//             {cat.blog_category_title}
//           </span>
//         ))}
//       </div>

//       {/* BLOG GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
//           gap: "40px",
//         }}
//       >
//         {blogs.length === 0 ? (
//           <p style={{ textAlign: "center", width: "100%" }}>
//             No blogs found.
//           </p>
//         ) : (
//           blogs.map((blog) => (
//             <div
//               key={blog.blog_id}
//               style={{
//                 borderRadius: "18px",
//                 overflow: "hidden",
//                 background: "#fff",
//                 boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//               }}
//             >
//               {/* IMAGE */}
//               {blog.blog_feature_image && (
//                 <img
//                   src={`https://abcindia.eclickprojects.com/public${blog.blog_feature_image}`}
//                   alt={blog.blog_title}
//                   style={{
//                     width: "100%",
//                     height: "240px",
//                     objectFit: "cover",
//                   }}
//                 />
//               )}

//               {/* CONTENT */}
//               <div style={{ padding: "25px" }}>
//                 {/* CATEGORY */}
//                 <span
//                   style={{
//                     background: "#ffe5e5",
//                     padding: "6px 12px",
//                     borderRadius: "6px",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#c1121f",
//                   }}
//                 >
//                   {blog?.Category?.blog_category_title}
//                 </span>

//                 <h3 style={{ marginTop: "15px" }}>
//                   {blog.blog_title}
//                 </h3>

//                 <p style={{ color: "#555" }}>
//                   {blog.blog_short_description?.slice(0, 140)}...
//                 </p>

//                 {/* DATE */}
//                 <p style={{ fontSize: "13px", color: "#888" }}>
//                   {new Date(blog.blog_publish_at).toDateString()}
//                 </p>

//                 {/* READ MORE */}
//                 <a
//                   href={`/blog/${blog.blog_slug}`}
//                   style={{
//                     display: "inline-block",
//                     marginTop: "10px",
//                     color: "#c1121f",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Read More →
//                 </a>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default Page;
