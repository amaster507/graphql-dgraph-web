import React, { useState } from "react"
import { Link } from "gatsby"
import { Accordion, Dropdown } from "react-bootstrap"
import { Images } from "../../../images/index"
import SideBarContentDropDown from "../SideBarContentDropDown"

import "./style.scss"

const config = require("../../../../config")

const SideBar = props => {
  const [sideBarOpen, setSideBarStylingOption] = useState(false)

  function isActive(obj) {
    return obj.isCurrent ? { className: "active" } : null
  }

  let currentChildren = []
  let currentParent
  let completeRes = []

  completeRes = config.sidebarOptions.map(node => {
    currentParent = node.title
    let mainNode = (
      <li key={node.title} className="sidebar-inline">
        <Link
          to={"/" + node.path.replace("index.mdx", "").replace(".mdx", "")}
          getProps={isActive}
        >
          {node.title}
        </Link>
      </li>
    )
    if (node.children !== undefined) {
      currentChildren = node.children.map(childNode => {
        let child = (
          <li key={childNode.title}>
            <Link
              to={"/" + childNode.path.replace(".mdx", "")}
              getProps={isActive}
            >
              {childNode.title}
            </Link>
          </li>
        )
        return child
      })
    }

    const res = (
      <React.Fragment key={currentParent}>
        <Accordion defaultActiveKey={currentParent}>
          {mainNode}
          {currentChildren.length !== 0 && (
            <Accordion.Toggle as="span" eventKey={currentParent}>
              <span className="cursor-pointer"> - </span>
            </Accordion.Toggle>
          )}
          {currentChildren.length !== 0 && (
            <Accordion.Collapse eventKey={currentParent}>
              <ul className="list-no-style">{currentChildren}</ul>
            </Accordion.Collapse>
          )}
        </Accordion>
      </React.Fragment>
    )

    currentChildren = []
    return res
  })

  const changeVersion = eventKey => {
    if (eventKey !== "master") {
      window.location.assign(process.env.GATSBY_URL + eventKey)
    } else {
      window.location.assign(process.env.GATSBY_URL)
    }
  }

 const  setSideBarStylingOverflow = isOpen => {
    setSideBarStylingOption(isOpen)
  }

  const list = (
    <div className={!sideBarOpen ? "side-bar" : "side-bar-close"}>
      <div className="page-logo">
        <Link to="/" className="img-logo header-link">
          <img src={Images.DgraphLogo} alt="Dgraph logo" />
        </Link>
      </div>
      <Dropdown
        onSelect={(eventKey, event) => changeVersion(eventKey)}
        size="xs"
      >
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          bsPrefix="dropdown-basic-customized"
        >
          Version
        </Dropdown.Toggle>
        <Dropdown.Menu bsPrefix="dropdown-menu">
          {process.env.GATSBY_VERSIONS.split(",").map(version => (
            <Dropdown.Item
              key={version}
              active={version === process.env.GATSBY_CURRENT_VERSION}
              eventKey={version}
              bsPrefix="dropdown-version-item dropdown-item"
            >
              <span className="version">{version}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* <SideBarContentDropDown
        getSideBarContents={props.getSideBarContents}
        contentTitle={props.contentTitle}
        setSideBarStylingOverflow={isOpen => setSideBarStylingOverflow(isOpen)}
      /> */}
      <ul className="sidenav">{completeRes}</ul>
    </div>
  )

  return list
}

export default SideBar
