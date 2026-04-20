/**
 * Folder structure data
 * Represents a hierarchical file/folder structure
 */
const data = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "src",
      isFolder: true,
      items: [
        {
          name: "components",
          isFolder: true,
          items: [
            { name: "Folder.jsx", isFolder: false },
            { name: "Header.jsx", isFolder: false },
          ],
        },
        {
          name: "styles",
          isFolder: true,
          items: [
            { name: "App.css", isFolder: false },
            { name: "index.css", isFolder: false },
          ],
        },
        { name: "App.jsx", isFolder: false },
        { name: "main.jsx", isFolder: false },
      ],
    },
    {
      name: "public",
      isFolder: true,
      items: [{ name: "index.html", isFolder: false }],
    },
    {
      name: "config",
      isFolder: true,
      items: [
        { name: "vite.config.js", isFolder: false },
        { name: "eslint.config.js", isFolder: false },
      ],
    },
    { name: "package.json", isFolder: false },
    { name: "README.md", isFolder: false },
  ],
};

export default data;