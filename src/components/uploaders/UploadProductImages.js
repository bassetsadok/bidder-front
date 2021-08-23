import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import React, { Component } from 'react';
import { HiPlusCircle, HiTrash } from 'react-icons/hi';

class UploadProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'djlbyjz2s',
        uploadPreset: 'l9l35ida',
        maxFiles: 4,
        sources: ['local', 'facebook'],
        resourceType: 'image',
        clientAllowedFormats: ['jpeg', 'png', 'jpg'],

        // croppingAspectRatio: 1,
        //showSkipCropButton: false,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          this.setState({ images: [...this.state.images, result.info.url] });
          this.props.setFieldValue('images', this.state.images);
        }
      }
    );
    const self = this;
    const thisProps = this.props;
    document.getElementById('upload_widget-product-images').addEventListener(
      'click',
      function () {
        self.setState({ images: [] });
        thisProps.setFieldValue('images', []);
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <>
        {!this.props.completed && (
          <Box
            id="upload_widget-product-images"
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center center"
            border="3px"
            rounded="lg"
            my="2rem"
            borderStyle="dashed"
            borderColor={this.props.errors ? 'red' : 'gray.500'}
            position="relative"
            height="100px"
          >
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
        )}
        <Flex wrap="wrap" justify="space-between">
          {this.state.images.map(imageSrc => (
            <Box
              borderWidth="2px"
              borderColor="blue"
              borderStyle="dotted"
              position="relative"
              rounded="lg"
              width="48%"
              mb="1.3rem"
            >
              <IconButton
                onClick={() => {
                  this.setState({
                    images: this.state.images.filter(img => img !== imageSrc),
                  });
                  this.props.setFieldValue('images', this.state.images);
                }}
                position="absolute"
                m="2px"
                aria-label="Delete image"
                colorScheme="red"
                icon={<HiTrash />}
              />
              <Image src={imageSrc} />
            </Box>
          ))}
        </Flex>
      </>
    );
  }
}

export default UploadProductImages;
