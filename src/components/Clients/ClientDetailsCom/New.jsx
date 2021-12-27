import React, { Component } from "react";

class DwnImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      imageArray: [
        "https://greatgable.fra1.cdn.digitaloceanspaces.com/448-1640615181448^0266554465.jpeg",
        "https://images.unsplash.com/photo-1578895210405-907db486c111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80, https://images.unsplash.com/photo-1572166365087-96ac83103260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80, https://images.unsplash.com/photo-1508706000025-b720ee541485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1410&q=80",
        "https://images.unsplash.com/photo-1578895210405-907db486c111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80, https://images.unsplash.com/photo-1572166365087-96ac83103260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80, https://images.unsplash.com/photo-1508706000025-b720ee541485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1410&q=80",
        "https://images.unsplash.com/photo-1578895210405-907db486c111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80, https://images.unsplash.com/photo-1572166365087-96ac83103260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80, https://images.unsplash.com/photo-1508706000025-b720ee541485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1410&q=80",
      ],
    };
  }

  fileDownloadHandler = async (pictures) => {
    for (var i = 0; i < pictures.length; i++) {
    //   console.log(pictureUrl);
      const response = await fetch(pictures[i], {method:"get"});
      response.blob().then((blob) => {
        console.log(blob)
        // let url = window.URL.createObjectURL(blob);
        // let a = document.createElement("a");
        // a.href = url;
        // a.download = "picture.jpeg";
        // a.click();
      });
    }
  };

  render() {
    return (
      <button
        type="button"
        onClick={() => this.fileDownloadHandler(this.state.imageArray)}
      >
        Download Pictures
      </button>
    );
  }
}

export default DwnImages;
