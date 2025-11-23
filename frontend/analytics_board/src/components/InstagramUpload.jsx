// const InstagramUpload = ({ onUploadComplete }) => {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
//       {/* Centered text block */}
//       <p className="text-gray-300 mb-10 max-w-2xl text-center">
//         Select the <strong>root folder</strong> of your Instagram export{" "}
//         (the folder that contains <em>messages</em>, <em>connections</em>, etc).{" "}
//         Everything is processed locally on your device.
//       </p>

//       {/* Example upload area so you can see layout */}
//       <div className="border border-dashed border-gray-600 rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
//         <p className="text-gray-400 mb-4 text-center">
//           Drag a folder here or click to select
//         </p>
//         <input
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           className="hidden"
//           id="folder-input"
//           onChange={(e) => {
//             // placeholder for your actual upload handler
//             onUploadComplete?.(e.target.files);
//           }}
//         />
//         <label
//           htmlFor="folder-input"
//           className="cursor-pointer px-4 py-2 rounded-lg bg-sky-500 text-white font-medium"
//         >
//           Choose folder
//         </label>
//       </div>
//     </div>
//   );
// };

// export default InstagramUpload;

const InstagramUpload = ({ onUploadComplete, analytics }) => {
  const handleFolderChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onUploadComplete?.(files);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 px-4">
      <h2 className="text-3xl font-semibold text-white mb-4 text-center">
        Instagram Data
      </h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-center">
        Select the <strong>root folder</strong> of your Instagram export
        (the folder that contains <em>messages</em>, <em>connections</em>, etc).
        Everything is processed locally on your device.
      </p>

      {/* Upload box */}
      <div className="w-full max-w-md border border-dashed border-gray-600 rounded-2xl p-8 flex flex-col items-center gap-4 mb-10">
        <p className="text-gray-400 text-center">
          Drag a folder here or click to select
        </p>

        <input
          id="insta-folder-input"
          type="file"
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={handleFolderChange}
        />

        <label
          htmlFor="insta-folder-input"
          className="cursor-pointer px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium"
        >
          Choose Instagram folder
        </label>
      </div>

      {/* Analytics on the same slide (only after upload) */}
      {analytics ? (
        <div className="w-full max-w-3xl bg-slate-900/70 rounded-2xl p-6 text-gray-100">
          <h3 className="text-xl font-semibold mb-4">
            Instagram analytics
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Total messages parsed: {analytics.totalMessages ?? "—"}</li>
            <li>• Unique chat partners: {analytics.uniqueChats ?? "—"}</li>
            <li>• Example stat: messages per day, top chats, etc.</li>
          </ul>
        </div>
      ) : (
        <p className="text-xs text-gray-500">
          Upload a folder to see Instagram analytics here.
        </p>
      )}
    </div>
  );
};

export default InstagramUpload;