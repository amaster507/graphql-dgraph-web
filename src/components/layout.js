import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import SearchBar from "./GraphQLDocs/SearchBar/index.js";
import SideBar from "./GraphQLDocs/SideBar/index";
import Footer from "./Footer"
import SideBarRight from "./sidebarright"
import { Location } from "@reach/router"
import SEO from "../components/seo"

import "./layout.scss"
import "./seti.css"

class Layout extends React.Component {
  state = {
    sideBarContentClass: 'Dgraph GraphQL'
  }

  getSideBarContents = (sideBarClassTitle) => {
    this.setState({
      sideBarContentClass: sideBarClassTitle
    })
  }

  render() {
    const { getSideBarContents } = this;
    const { sideBarContentClass } = this.state;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <SEO
              title={
                this.props.pageContext !== undefined
                  ? this.props.pageContext.frontmatter.title
                  : "Dgraph GraphQL"
              }
            />
              <div className="side-bar-container">
                <SideBar contentTitle={sideBarContentClass} getSideBarContents={(sideBarClassTitle) => getSideBarContents(sideBarClassTitle)} />
              </div>
              <div className="content-wrap">
                <SearchBar />
                <div className="landing-pg">
                  <div>
                    <Location>
                      {({ location }) => {
                        return <SideBarRight file={location.pathname} />
                      }}
                    </Location>
                  </div>
                  {this.props.children}
                </div>
                <Footer />
            </div>
          </>
        )}
      />
    )
  }

}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
