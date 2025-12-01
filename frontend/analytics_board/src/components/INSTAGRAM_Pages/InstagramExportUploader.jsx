import React, { useState } from "react";

function InstagramExportUploader() {
  const [filesMap, setFilesMap] = useState({});
  const [error, setError] = useState(null);

  const handleFolderChange = async (e) => {
    const fileList = Array.from(e.target.files || []);
    setError(null);

    if (fileList.length === 0) {
      setFilesMap({});
      return;
    }

    // We’ll keep JSONs only
    const jsonFiles = fileList.filter((file) =>
      file.name.toLowerCase().endsWith(".json")
    );

    if (jsonFiles.length === 0) {
      setError("No JSON files found in the selected folder.");
      setFilesMap({});
      return;
    }

    try {
      const entries = await Promise.all(
        jsonFiles.map(async (file) => {
          // e.g. "instagram-data-2025-11-30/your_instagram_activity/likes/liked_posts.json"
          let relPath = file.webkitRelativePath || file.name;

          // strip the top-level folder so the key starts at the export root
          // "instagram-data-2025-11-30/your_instagram_activity/likes/liked_posts.json"
          // -> "your_instagram_activity/likes/liked_posts.json"
          const firstSlash = relPath.indexOf("/");
          if (firstSlash !== -1) {
            relPath = relPath.slice(firstSlash + 1);
          }

          const text = await file.text();
          const json = JSON.parse(text);

          return [relPath, json]; // key is the relative path, value is parsed JSON
        })
      );

      const map = Object.fromEntries(entries);
      setFilesMap(map);
      // At this point you can POST `map` to backend
      // await fetch("/api/instagram-upload", { method: "POST", body: JSON.stringify(map) })
    } catch (err) {
      console.error(err);
      setError("Failed to read or parse some JSON files.");
      setFilesMap({});
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <label
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Select Instagram export folder
        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          accept=".json,application/json"
          onChange={handleFolderChange}
          style={{ display: "none" }}
        />
      </label>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <h3>Files map (key = relative path from export root)</h3>
      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          borderRadius: "0.5rem",
          maxHeight: "300px",
          overflow: "auto",
          fontSize: "0.8rem",
        }}
      >
        {JSON.stringify(filesMap, null, 2)}
      </pre>
    </div>
  );
}

export default InstagramExportUploader;