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
    return (
      <div key={title}>
        <div className={className}></div>
        <p className="card-text">
          <strong>{`${title} `}</strong>
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
            this.renderSection(section[0], section[1], index)
          )}
        </div>
      </div>
    );
  }

  /**
   * Render the application.
   * @returns JSX content
   */
  render() {
    // The JSON document passed to the invocation
    // console.log(this.props)
    // console.log(this.props.document)
    const document = this.props.document;
    const string = `Key = ${document["key"]}`;

    const modelName = "Model Name";

    const content =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales eu ligula ac tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In erat tortor, feugiat quis hendrerit non, varius sit amet diam. Pellentesque quis massa non purus volutpat luctus. Duis eu tellus consequat, efficitur velit et, mollis ante. Praesent facilisis nulla in neque lacinia, non vestibulum mi sagittis.";

    const cards = [
      {
        title: "Attribute 0",
        sections: [
          ["Section 0", content],
          ["Section 1", content],
        ],
      },
      {
        title: "Attribute 1",
        sections: [
          ["Section 0", content],
          ["Section 1", content],
          ["Section 2", content],
        ],
      },
      {
        title: "Attribute 2",
        sections: [
          ["Section 0", content],
          ["Section 1", content],
          ["Section 2", content],
        ],
      },
      {
        title: "Attribute 3",
        sections: [
          ["Section 0", content],
          ["Section 1", content],
        ],
      },
    ];

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

    const metadata = (
      <div className="col meta_style">
        <div className="card border-0">
          <div className="card-body header_style">
            <p>Authors: Foo Bar, Foo Bar, Foo Bar</p>
            <p>Source URL: https://github.com/mlte-team</p>
            <p>Artifact URL: https://github.com/mlte-team</p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container page_style">
        <div className="row">
          {emblem}
          {title}
          {metadata}
        </div>
        {cards.map((def) => (
          <div key={def["title"]} className="row">
            <div className="col">
              {this.renderCard(def["title"], def["sections"])}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
