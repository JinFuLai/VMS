import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}
// import { Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';

// class Demo extends React.Component {
//   state = {
//     fileList: [],
//     uploading: false,
//   };

//   handleUpload = () => {
//     const { fileList } = this.state;
//     const formData = new FormData();
//     fileList.forEach(file => {
//       formData.append('files[]', file);
//     });

//     this.setState({
//       uploading: true,
//     });

//     // You can use any AJAX library you like
//     reqwest({
//       url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//       method: 'post',
//       processData: false,
//       data: formData,
//       success: () => {
//         this.setState({
//           fileList: [],
//           uploading: false,
//         });
//         message.success('upload successfully.');
//       },
//       error: () => {
//         this.setState({
//           uploading: false,
//         });
//         message.error('upload failed.');
//       },
//     });
//   };

//   render() {
//     const { uploading, fileList } = this.state;
//     const props = {
//       onRemove: file => {
//         this.setState(state => {
//           const index = state.fileList.indexOf(file);
//           const newFileList = state.fileList.slice();
//           newFileList.splice(index, 1);
//           return {
//             fileList: newFileList,
//           };
//         });
//       },
//       beforeUpload: file => {
//         this.setState(state => ({
//           fileList: [...state.fileList, file],
//         }));
//         return false;
//       },
//       fileList,
//     };

//     return (
//       <div>
//         <Upload {...props}>
//           <Button>
//             <UploadOutlined /> Select File
//           </Button>
//         </Upload>
//         <Button
//           type="primary"
//           onClick={this.handleUpload}
//           disabled={fileList.length === 0}
//           loading={uploading}
//           style={{ marginTop: 16 }}
//         >
//           {uploading ? 'Uploading' : 'Start Upload'}
//         </Button>
//       </div>
//     );
//   }
// }

export default Avatar;