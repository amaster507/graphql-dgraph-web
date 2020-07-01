import React from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";

export default (props) => {
  return (
    <div
      href="https://dgraph.io/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer"
    >
      <span>
      
        <a
          href="https://twitter.com/dgraphlabs"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm"
          style={{ backgroundColor: "#00acee", marginRight: 5 }}
        >
          <FaTwitter style={{ color: "white" }} />
        </a>
        <a
          target="_blank"
          className="btn btn-secondary btn-sm"
          href="https://github.com/dgraph-io/graphql-dgraph-web"
          rel="noopener noreferrer"
          size="sm"
          variant="light"
        >
          <FaGithub />
        </a>
      </span>
    </div>
  )
};
