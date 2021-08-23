import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useUser } from '../../hooks/user';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SmallProductCard({ product, fetchAll }) {
  const { user } = useUser();
  const storeToken = localStorage.getItem('user-token');
  //{{URL}}/api/v1/products/bids/6106958479ac3c30c4030cb7
  const [deleting, setDeleting] = useState(false);
  const deleteBid = async productId => {
    setDeleting(true);
    const res = await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}/bids`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setDeleting(false);
      });

    if (res?.status === 204) {
      setDeleting(false);
      fetchAll();
    }
  };

  const bidAmountArray = product?.bids?.filter(
    bid => bid.user._id === user._id
  );
  const bidAmount = bidAmountArray.length > 0 ? bidAmountArray[0].amount : '';
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
            Bidded Price : <Badge>{bidAmount} DA</Badge>{' '}
          </Text>
          <Text fontSize="14px">
            Current price : <Badge>{product.currentPrice} DA</Badge>
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
            as={BrowserLink}
            to={`/products/${product._id}`}
            width="9rem"
            mb=".5rem"
          >
            View more
          </Button>{' '}
          <br />
          <Button
            isLoading={deleting}
            loadingText="Deleting .."
            onClick={() => {
              deleteBid(product._id);
            }}
            width="9rem"
            colorScheme="red"
          >
            Delete bid
          </Button>
        </Box>
      </Flex>
    </div>
  );
}
