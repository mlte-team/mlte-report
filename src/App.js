import React from "react";

class App extends React.Component {
  /**
   * Render an individual card section.
   * @param title The subsection title
   * @param content The subsection content
   * @returns JSX content
   */
  renderSection(title, content, index) {
    const className = index == 0 ? "" : "card-title";
    const titleContent = title == "" ? <></> : <strong>{`${title} `}</strong>;
    return (
      <div key={`${title}${index}`}>
        <div className={className}></div>
        <p className="card-text">
          {titleContent}
          {content}
        </p>
      </div>
    );
  }

  /**
   * Render an individual card.
   * @param title The title of the card
   * @param sections An array of card sections
   * @returns JSX content
   */
  renderCard(title, sections) {
    return (
      <div key={title} className="card border-dark m-2 pagebreak">
        <h5 className="card-header">{title}</h5>
        <div className="card-body">
          {sections.map((section, index) =>
            this.renderSection(section["title"], section["content"], index)
          )}
        </div>
      </div>
    );
  }

  /**
   * Render the report title.
   * @param document The JSON document
   * @return JSX content
   */
  renderTitle(document) {
    // The report metadata
    const metadata = document["metadata"];

    // The name of the project
    const modelName = document["model_details"]["name"];
    // The authors of the report
    const authors = metadata["authors"].join(", ");
    // The source code URL
    const sourceURL = metadata["source_url"];
    // The artifacts URL
    const artifactsURL = metadata["artifacts_url"];

    const emblem = (
      <div className="col title_style">
        <div className="card border-0">
          <div className="card-body header_style">
            <div className="row logo_style">
              <img src="https://raw.githubusercontent.com/mlte-team/mlte-report/master/assets/ai2c_logo.png"></img>
            </div>
          </div>
        </div>
      </div>
    );

    const title = (
      <div className="col title_style">
        <div className="card border-0">
          <div className="card-body header_style">
            <div className="row">
              <h1>{modelName}</h1>
              <h3>MLTE Report</h3>
            </div>
          </div>
        </div>
      </div>
    );

    const contactInformation = (
      <div className="col meta_style">
        <div className="card border-0">
          <div className="card-body header_style">
            <p>{`Authors: ${authors}`}</p>
            <p>{`Source URL: ${sourceURL}`}</p>
            <p>{`Artifact URL: ${artifactsURL}`}</p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="row">
        {emblem}
        {title}
        {contactInformation}
      </div>
    );
  }

  /**
   * Render the body of the report (excluding suite).
   * @param document The JSON document
   * @returns JSX content
   */
  renderReportBody(document) {
    // Populate cards with body of report
    let cards = [];

    // Model overview
    cards.push({
      key: "ModelOverview",
      title: "Model Overview",
      sections: [{ title: "", content: document["model_details"]["overview"] }],
    });

    // Model documentation
    cards.push({
      key: "ModelDocumentation",
      title: "Model Documentation",
      sections: [
        {
          title: "",
          content: document["model_details"]["documentation"],
        },
      ],
    });

    // Model specification
    const spec = document["model_specification"];
    cards.push({
      key: "ModelSpecification",
      title: "Model Specification",
      sections: [
        { title: "Domain", content: spec["domain"] },
        { title: "Architecture", content: spec["architecture"] },
        { title: "Input", content: spec["input"] },
        { title: "Output", content: spec["output"] },
      ],
    });

    // Dataset description
    const datasets = spec["data"].map((item, index) => {
      return {
        key: `DatasetDescriptor${index}`,
        title: "Dataset Descriptor",
        sections: [
          { title: "Identifier", content: item["name"] },
          { title: "Link", content: item["link"] },
          { title: "Description", content: item["description"] },
        ],
      };
    });
    cards.push(...datasets);

    const considerations = document["considerations"];

    // Intended users
    cards.push({
      key: "IntendedUsers",
      title: "Intended Users",
      sections: [
        considerations["users"].map((item) => {
          return { title: item["identifier"], content: item["description"] };
        }),
      ],
    });

    // Use cases
    const useCases = considerations["use_cases"].map((item, index) => {
      return {
        key: `UseCase${index}`,
        title: "Use Case",
        sections: [{ title: item["identifier"], content: item["description"] }],
      };
    });
    cards.push(...useCases);

    // Limitations
    const limitations = considerations["limitations"].map((item, index) => {
      return {
        key: `Limitation${index}`,
        title: "Limitation",
        sections: [{ title: item["identifier"], content: item["description"] }],
      };
    });
    cards.push(...limitations);

    return (
      <>
        {cards.map((def) => (
          <div key={def["key"]} className="row">
            <div className="col">
              {this.renderCard(def["title"], def["sections"])}
            </div>
          </div>
        ))}
      </>
    );
  }

  /**
   * Render the results of the suite report.
   * @param document The JSON document
   * @return JSX content
   */
  renderReportSuite(document) {
    return <></>;
  }

  /**
   * Render the application.
   * @returns JSX content
   */
  render() {
    // The JSON document passed to the invocation
    const document = this.props.document;

    return (
      <div className="container page_style">
        {this.renderTitle(document)}
        {this.renderReportBody(document)}
        {this.renderReportSuite(document)}
      </div>
    );
  }
}

export default App;
