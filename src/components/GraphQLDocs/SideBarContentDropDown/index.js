import React from "react"
import { Dropdown } from "react-bootstrap"
import { sideBarContentClasses } from "../../../utils/GrapQLDocs/sideBarContents"

import "./style.scss"




export default function SideBarContentDropDown(props) {
    const { getSideBarContents, contentTitle } = props

    return (
        <div className="side-bar-content-container">
            <Dropdown
                onSelect={(eventKey, event) => getSideBarContents(eventKey)}
                size="xs"
                bsPrefix="sidebar-content-dropdown"
                onToggle={(isOpen)=>{props.setSideBarStylingOverflow(isOpen)}}
            >
                <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    bsPrefix="dropdown-content-selector btn-lighter-gradient"
                >
                    <span className="primary-text">{contentTitle}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu bsPrefix="dropdown-content-menu">
                <Dropdown.Header bsPrefix="dropdown-content-menu-header">GRAPHQL DOCS SECTIONS</Dropdown.Header>
                    {sideBarContentClasses.map(content => (
                        <Dropdown.Item
                            key={content.title}
                            // active={version === process.env.GATSBY_CURRENT_VERSION}
                            eventKey={content.title}
                            bsPrefix="dropdown-content-item"
                        >
                            <div className="content">
                                <div className="content-icon-container"><img src={content.icon} alt="contentIcon" /></div>
                                <div className="content-description">
                                    <div className="content-title">{content.title}</div>
                                    <div className="content-subtitle">{content.subTitle}</div>
                                </div>
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
