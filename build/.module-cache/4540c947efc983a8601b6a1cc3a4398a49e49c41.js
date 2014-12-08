/** @jsx React.DOM */

var converter = new Showdown.converter();

var data = [
  { Author: "Daniel Lo Nigro 2", Text: "Hello ReactJS.NET World! 2" },
  { Author: "Pete Hunt 2", Text: "This is one comment 2" },
  { Author: "Jordan Walke 2", Text: "This is *another* comment 2" }
];

var Comment = React.createClass({displayName: 'Comment',
  render: function() {
  var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
    );
  }
});

var CommentList = React.createClass({displayName: 'CommentList',
  render: function() {

    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(Comment, {author: comment.Author}, comment.Text);
    });

    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});

var CommentForm = React.createClass({displayName: 'CommentForm',
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, world! I am a CommentForm."
      )
    );
  }
});

var CommentBox = React.createClass({displayName: 'CommentBox',
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    }.bind(this);
    xhr.send();
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 

        React.createElement(CommentList, {data: this.state.data}), 

        React.createElement(CommentForm, null)
      )
    );
  }
});

React.renderComponent(
  //<CommentBox data={data}/>,
  React.createElement(CommentBox, {url: "/comments"}),
  document.getElementById('content')
);
