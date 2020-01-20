import React, { Component } from 'react';

class ImageUpload extends Component {
  state = { files: [], displayed: [], drag: false, msgState: 'Drop Here' };

  fileObj = [];
  fileArray = [];

  /* Refs provide a way to access DOM nodes or React elements created in the render method. */
  dropRef = React.createRef();

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);

    //TODO - free memory return () => URL.revokeObjectURL(objectUrl)
  }

  handleDrag = ev => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  handleDragIn = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragCounter++;
    if (ev.dataTransfer.files && ev.dataTransfer.files.length > 0) {
      this.setState({ drag: true });
    }
  };

  handleDragOut = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };

  handleDrop = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({ drag: false });
    if (ev.dataTransfer.files && ev.dataTransfer.files.length > 0) {
      this.setPreviewImages(ev.dataTransfer.files);
      this.props.handleImageUpload(ev.dataTransfer.files);

      ev.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  handleChange = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setPreviewImages(ev.target.files);
    this.props.handleImageUpload(ev.target.files);
  };

  setPreviewImages = files => {
    this.fileObj.push(files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
      // URL.revokeObjectURL(this.fileObj[0][i]);
    }

    console.log(this.fileArray, this.state.files);
    this.setState({ files: this.fileArray });
  };

  render() {
    return (
      <div className='upload-container' ref={this.dropRef}>
        <div className='left-box'>
          <div className='dropzone-wrapper'>
            <div className='dropzone-desc'>
              <i className='glyphicon glyphicon-download-alt'></i>
              <p>Choose an image file or drag it here.</p>
            </div>
            <input type='file' id='file-upload' name='img_logo' className='dropzone' multiple accept='image/*' onChange={this.handleChange} />
          </div>
        </div>
        <div className='right-box'>
          <div className='preview-zone hidden'>
            <div className='box box-solid'>
              <div className='box-header with-border'>
                {/* <div>
                  <h4>Preview</h4>
                </div> */}
                {/* <div className='box-tools pull-right'>
                  <button type='button' className='btn btn-danger btn-xs remove-preview'>
                    <i className='fas fa-times'></i> Reset This Form
                  </button>
                </div> */}
              </div>
              <div className='box-body'>
                {(this.fileArray || []).map((url, idx) => (
                  <img key={idx} src={url} className='preview-image' alt='...' />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUpload;

/*

 htmlFor='file-upload'




function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}


*/
