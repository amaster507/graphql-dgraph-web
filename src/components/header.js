import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import DgraphLogo from "../images/graphql-logo.png"
import { Dropdown } from "react-bootstrap"
import Back from "./back"


const config = require("../../config")

const changeVersion = eventKey => {
  if (eventKey !== "master") {
    window.location.assign(process.env.GATSBY_URL + eventKey)
  } else {
    window.location.assign(process.env.GATSBY_URL)
  }
}

const Header = ({ siteTitle }) => {
  return (
    <div className="header-spacing">
      <div className="page-header">
        <div className="page-logo">
          <Link to="/" className="img-logo header-link">
            <img src={DgraphLogo} alt="Dgraph logo" />
          </Link>
        </div>
        <div class="d-flex align-items-center justify-content-between" style={{flex:1}}>
          <Dropdown
            onSelect={(eventKey, event) => changeVersion(eventKey)}
            size="xs"
          >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Version
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {process.env.GATSBY_VERSIONS.split(",").map(version => (
                <Dropdown.Item
                  key={version}
                  active={version === process.env.GATSBY_CURRENT_VERSION}
                  eventKey={version}
                >
                  {version}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Back/>

        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "",
}

export default Header
