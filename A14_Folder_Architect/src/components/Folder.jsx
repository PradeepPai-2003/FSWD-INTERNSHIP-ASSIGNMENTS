import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Folder Component - Renders a folder or file in the directory tree
 * @param {Object} data - Data object containing name, isFolder, and items (if folder)
 * @param {boolean} isLoading - Whether data is currently loading
 */
function Folder({ data, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handle folder toggle click
   * Prevents event propagation and prevents toggling during loading
   */
  const handleClick = (e) => {
    e.stopPropagation();

    if (isLoading) {
      return;
    }

    setIsOpen(!isOpen);
  };

  // Render file component
  if (!data.isFolder) {
    return (
      <div className="file-item" title={data.name}>
        <span className="file-icon">📄</span>
        <span className="file-name">{data.name}</span>
      </div>
    );
  }

  // Render folder component
  return (
    <div className="folder-item">
      <div
        className={`folder-toggle ${isLoading ? "disabled" : ""}`}
        onClick={handleClick}
        role="button"
        tabIndex={isLoading ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isLoading) {
            handleClick(e);
          }
        }}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Open" : "Closed"} folder: ${data.name}`}
      >
        <span className="toggle-icon" aria-hidden="true">
          {isOpen ? "📂" : "📁"}
        </span>
        <span className="folder-name">{data.name}</span>
        {data.items && (
          <span className="item-count">({data.items.length})</span>
        )}
      </div>

      {isOpen && !isLoading && data.items && (
        <div className="folder-children">
          {data.items.map((item, index) => (
            <Folder key={`${item.name}-${index}`} data={item} isLoading={isLoading} />
          ))}
        </div>
      )}
    </div>
  );
}

Folder.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isFolder: PropTypes.bool.isRequired,
    items: PropTypes.array,
  }).isRequired,
  isLoading: PropTypes.bool,
};

Folder.defaultProps = {
  isLoading: false,
};

export default Folder;