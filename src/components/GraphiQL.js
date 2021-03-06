import GraphiQL from "graphiql"
import GraphiQLExplorer from "graphiql-explorer"
import "graphiql/graphiql.css"
import { buildClientSchema, getIntrospectionQuery } from "graphql"
import React, { useEffect, useRef, useState } from "react"


export default function GraphiQLWrapper({ defaultQuery }) {
  const editor = useRef(null)
  const [query, setQuery] = useState("")
  const [schema, setSchema] = useState(null)
  const [explorerIsOpen, setExplorerIsOpen] = useState(false)

  function graphQLFetcher(graphQLParams) {
    return fetch("http://localhost:8080/graphql", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json())
  }

  const getSchema = async () => {
    const res = await graphQLFetcher({
      query: getIntrospectionQuery(),
    })
    setSchema(buildClientSchema(res.data))
    getDefaultQuery()
  }

  const getDefaultQuery = () => {
      if (defaultQuery !== undefined)
        setQuery(defaultQuery)
  }

  const toggleExplorerState = () => {
    setExplorerIsOpen(!explorerIsOpen)
  }

  useEffect(() => {
    getSchema()
  })

  return (
    <div className="graphiql-wrapper graphiql-tab">
      <div className="graphiql-container">
        <GraphiQLExplorer
          schema={schema}
          query={query}
          onEdit={q => setQuery(q)}
          onRunOperation={operationName => editor.handleRunQuery(operationName)}
          explorerIsOpen={explorerIsOpen}
          onToggleExplorer={toggleExplorerState}
        />
        <GraphiQL
          fetcher={graphQLFetcher}
          schema={schema}
          query={query}
          editorTheme="seti"
          onEditQuery={q => setQuery(q)}
          ref={editor}
        >
          <GraphiQL.Toolbar>
            <GraphiQL.Button
              onClick={toggleExplorerState}
              label="Explorer"
              title="Toggle Explorer"
            />
          </GraphiQL.Toolbar>
        </GraphiQL>
      </div>
    </div>
  )
}
