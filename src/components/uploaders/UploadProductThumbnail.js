import { Box, Image } from '@chakra-ui/react';
import React, { Component } from 'react';
import { HiPlusCircle } from 'react-icons/hi';

class UploadProductThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
    };
  }
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'djlbyjz2s',
        uploadPreset: 'l9l35ida',
        sources: ['local', 'facebook'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        clientAllowedFormats: ['jpeg', 'png', 'jpg'],
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);

          this.setState({ thumbnail: result.info.url });
          this.props.setFieldValue('thumbnail', result.info.url);
        }
      }
    );
    document.getElementById('upload_widget-product-thumbnail').addEventListener(
      'click',
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <Box
        id="upload_widget-product-thumbnail"
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPosition="center center"
        border="3px"
        rounded="lg"
        my="2rem"
        borderStyle="dashed"
        borderColor={this.props.error ? 'red' : 'gray.500'}
        position="relative"
        height="300px"
      >
        {this.state.thumbnail && (
          <Image id="preview" src={this.state.thumbnail} />
        )}
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          bgColor="RGBA(63,212,159,0.3)"
          left="0"
          bottom="0"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{
            bg: 'RGBA(63,212,159,0.05)',
          }}
          p="3rem"
        >
          <HiPlusCircle size={90} color="teal" />
        </Box>
      </Box>
    );
  }
}

export default UploadProductThumbnail;
