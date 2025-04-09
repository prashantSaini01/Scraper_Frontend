// /* eslint-disable react/no-unescaped-entities */
// import { Link } from "react-router-dom"; // Assuming React Router for navigation
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faRocket,
//   faSearch,
//   faImage,
//   faSlidersH,
//   faNetworkWired,
//   faEye,
// } from "@fortawesome/free-solid-svg-icons";
 
// function WhyUs() {
//   const differentiators = [
//     {
//       icon: faRocket,
//       title: "Structured Workflow",
//       description:
//         "Our AI follows a proven process—plan, research, draft, refine—for perfect Instagram posts every time.",
//     },
//     {
//       icon: faSearch,
//       title: "Real-Time Research",
//       description:
//         "Powered by Tavily, we fetch the latest web insights, not stale data, for fresh, relevant content.",
//     },
//     {
//       icon: faImage,
//       title: "Text + Image in One",
//       description:
//         "Generate custom visuals with Stable Diffusion alongside your text—no extra tools needed.",
//     },
//     {
//       icon: faSlidersH,
//       title: "Your Control, Your Way",
//       description:
//         "Stop at any step—outline, draft, or final post—and iterate until it’s just right.",
//     },
//     {
//       icon: faNetworkWired,
//       title: "Social Media Savvy",
//       description:
//         "Tap into Twitter, YouTube, and more to inform your content, all in one platform.",
//     },
//     {
//       icon: faEye,
//       title: "See How It Works",
//       description:
//         "Transparent steps show you the magic, not just the result, at every stage.",
//     },
//   ];
 
//   const comparisonData = [
//     {
//       feature: "Instagram-Specific Workflow",
//       us: "Yes",
//       chatgpt: "No",
//       jasper: "Partial",
//       writesonic: "Partial",
//     },
//     {
//       feature: "Real-Time Research",
//       us: "Yes",
//       chatgpt: "No",
//       jasper: "No",
//       writesonic: "No",
//     },
//     {
//       feature: "Integrated Image Generation",
//       us: "Yes",
//       chatgpt: "No",
//       jasper: "No",
//       writesonic: "No",
//     },
//     {
//       feature: "Workflow Control",
//       us: "Yes",
//       chatgpt: "No",
//       jasper: "No",
//       writesonic: "No",
//     },
//     {
//       feature: "Multi-Platform Context",
//       us: "Yes",
//       chatgpt: "No",
//       jasper: "No",
//       writesonic: "No",
//     },
//     {
//       feature: "Transparency",
//       us: "Yes",
//       chatgpt: "No",
//       jasper: "No",
//       writesonic: "Partial",
//     },
//   ];
 
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
//         {/* Hero Section */}
//         <section className="text-center py-12 border-b border-gray-200">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
//             Not Just Text—Crafted Instagram Success
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Discover the only AI tool that plans, researches, writes, and
//             visualizes your Instagram posts in one seamless workflow.
//           </p>
//           <Link
//             to="/try-it"
//             className="mt-6 inline-block py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300"
//           >
//             Try It Now
//           </Link>
//         </section>
 
//         {/* The Problem Section */}
//         <section className="py-12 text-center border-b border-gray-200">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//             The Market Noise
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             With countless text generation tools flooding the market—ChatGPT,
//             Jasper, Writesonic—why choose us? Most tools spit out generic text
//             and leave you to do the rest. We don’t just generate; we{" "}
//             <span className="font-semibold text-blue-600">
//               create with purpose
//             </span>
//             .
//           </p>
//           <div className="mt-6 flex justify-center">
//             <div className="relative">
//               <img
//                 src="cluttered_competition.jpeg"
//                 alt="Competitor clutter"
//                 className="rounded-lg shadow-md opacity-50"
//               />
//               <img
//                 src="content_generator.png"
//                 alt="Our solution"
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg border-2 border-blue-600"
//               />
//             </div>
//           </div>
//         </section>
 
//         {/* Differentiators Section */}
//         <section className="py-12">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
//             What Sets Us Apart
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {differentiators.map((diff, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-gray-50 rounded-lg shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
//               >
//                 <FontAwesomeIcon
//                   icon={diff.icon}
//                   className="text-blue-600 text-3xl mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {diff.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {diff.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
 
//         {/* Comparison Table */}
//         <section className="py-12 border-t border-gray-200">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
//             How We Compare
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-4 text-gray-800 font-semibold border-b border-gray-200">
//                     Feature
//                   </th>
//                   <th className="p-4 text-gray-800 font-semibold border-b border-gray-200">
//                     Our App
//                   </th>
//                   <th className="p-4 text-gray-800 font-semibold border-b border-gray-200">
//                     ChatGPT
//                   </th>
//                   <th className="p-4 text-gray-800 font-semibold border-b border-gray-200">
//                     Jasper
//                   </th>
//                   <th className="p-4 text-gray-800 font-semibold border-b border-gray-200">
//                     Writesonic
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {comparisonData.map((row, index) => (
//                   <tr
//                     key={index}
//                     className="hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     <td className="p-4 text-gray-700 border-b border-gray-200">
//                       {row.feature}
//                     </td>
//                     <td className="p-4 text-blue-600 font-semibold border-b border-gray-200">
//                       {row.us}
//                     </td>
//                     <td className="p-4 text-gray-600 border-b border-gray-200">
//                       {row.chatgpt}
//                     </td>
//                     <td className="p-4 text-gray-600 border-b border-gray-200">
//                       {row.jasper}
//                     </td>
//                     <td className="p-4 text-gray-600 border-b border-gray-200">
//                       {row.writesonic}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
 
//         {/* Proof Points Section */}
//         <section className="py-12 border-t border-gray-200">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
//             See It in Action
//           </h2>
//           <div className="flex flex-col md:flex-row gap-8 items-center">
//             <div className="flex-1">
//               <div className="p-6 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   Sample Output
//                 </h3>
//                 <p className="text-gray-600 text-sm whitespace-pre-wrap">
//                   Outline: - Headline: Elon Musk: The Real-Life Iron Man? - Core
//                   Message: Elon Musk is a visionary entrepreneur pushing the
//                   boundaries of technology and innovation. - Key Points:
//                   Founder, CEO, and CTO of SpaceX, CEO of Tesla, Inc., Involved
//                   in Neuralink and The Boring Company, Visionary goals for space
//                   exploration and sustainable energy, Known for his ambitious
//                   projects and disruptive innovations
//                 </p>
//                 <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                   Generated in Seconds
//                 </span>
//               </div>
//             </div>
//             <div className="flex-1 text-center">
//               <p className="text-lg text-gray-600 italic mb-4">
//                 "This saved me hours of planning and designing Instagram posts!"
//               </p>
//               <p className="text-sm text-gray-500">— Social Media Manager</p>
//             </div>
//           </div>
//         </section>
 
//         {/* Call to Action Section */}
//         <section className="py-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">
//             Ready to Stand Out on Instagram?
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Generate your first post now and see the difference.
//           </p>
//           <Link
//             to="/try-it"
//             className="inline-block py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300"
//           >
//             Get Started Free
//           </Link>
//         </section>
 
//         {/* Technical Note */}
//         <footer className="py-6 text-center text-gray-500 text-sm">
//           <p>
//             Built with cutting-edge AI (langgraph, Gemini, Stable Diffusion),
//             hosted on a scalable Flask backend—powerful yet user-friendly.
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }
 
// export default WhyUs;

export const whyUs =  () => {


const SOCIAL_URL = import.meta.env.VITE_SOCIAL_URL;

  return (
    <iframe

      src={SOCIAL_URL}
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="Social Spark - AI Content Generator"
    />
  );
};

export default whyUs;