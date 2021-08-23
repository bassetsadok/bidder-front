import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Countdown from 'react-countdown';

import axios from 'axios';
import { toast } from 'react-toastify';
import { HiPhone } from 'react-icons/hi';

export default function AcceptedSellingBidCard({ product, fetchAll }) {
  const storeToken = localStorage.getItem('user-token');
  //{{URL}}/api/v1/products/bids/6106958479ac3c30c4030cb7
  const [confirm, setConfirm] = useState(false);

  console.log(product, 'AcceptedSellingBidCard');

  //{{URL}}/api/v1/products/6107b9dadcda78274c7eb2ea
  const markAsSold = async productId => {
    setConfirm(true);
    const res = await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}`,
        { sold: true },
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setConfirm(false);
      });

    if (res?.data?.status === 'success') {
      setConfirm(false);
      fetchAll();
    }
  };
  return (
    <div>
      <Flex mb="2rem">
        <Image
          rounded="lg"
          mr=".8rem"
          width="100px"
          height="100px"
          objectFit="cover"
          src={product.thumbnail}
        />
        <Box>
          <Text fontWeight="semibold">{product.name}</Text>
          <Badge>{product.category.name}</Badge>

          <Text fontSize="14px">
            Current price : <Badge>{product.currentPrice} DA</Badge>
          </Text>
          <Text fontSize="14px">
            Buyer : {product.buyer.firstName} {product.buyer.lastName}
          </Text>
          <Text fontSize="14px">
            Phone :{' '}
            <Badge>
              {' '}
              <a href={`tel:${product.buyer.phoneNumber}`}>
                {product.buyer.phoneNumber}
              </a>
            </Badge>
          </Text>
          <Badge colorScheme="yellow">
            <Countdown
              renderer={props => (
                <Text size="3xl">
                  {props.days} days | {props.hours}:{props.minutes} :
                  {props.seconds}
                </Text>
              )}
              date={product.deadDate}
            />
          </Badge>
        </Box>
        <Box textAlign="right" flexGrow="1">
          <Button
            width="11rem"
            loadingText="Marking ..."
            isLoading={confirm}
            onClick={() => markAsSold(product._id)}
            mb=".5rem"
          >
            Mark as sold
          </Button>{' '}
          <br />
          <Button
            as="a"
            href={`tel:${product.buyer.phoneNumber}`}
            leftIcon={<HiPhone />}
            colorScheme="green"
            width="11rem"
            mb=".5rem"
          >
            Call
          </Button>{' '}
        </Box>
      </Flex>
    </div>
  );
}
