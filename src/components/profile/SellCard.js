import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import Countdown from 'react-countdown';

import axios from 'axios';
import { toast } from 'react-toastify';

export default function SellCard({ product, fetchAll }) {
  const storeToken = localStorage.getItem('user-token');
  const [deleting, setDeleting] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const deleteProduct = async productId => {
    setDeleting(true);
    const res = await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);

        toast.warn('Ops, please try again');
        setDeleting(false);
      });

    if (res?.status === 204) {
      setDeleting(false);
      toast.success('product has been deleted');
      fetchAll();
    }
  };
  //{{URL}}/api/v1/products/6107b9dadcda78274c7eb2ea/bids/6106a6885ce7712fd81985ea
  const confirmBid = async (productId, userId) => {
    setLoadingConfirm(true);
    const res = await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}/bids/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setLoadingConfirm(false);
      });

    if (res?.data?.status === 'success') {
      setLoadingConfirm(false);
      fetchAll();
    }
  };
  return (
    <div>
      <Flex wrap="wrap" mb="2rem">
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
            View product
          </Button>{' '}
          <br />
          <Button
            isLoading={deleting}
            loadingText="Deleting .."
            onClick={() => {
              deleteProduct(product._id);
            }}
            width="9rem"
            colorScheme="red"
          >
            Delete
          </Button>
        </Box>
        <Accordion allowMultiple flexGrow="1" width="100%">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  The biddres{' '}
                  <Badge color={product.bids.length === 0 ? 'red' : 'green'}>
                    ({product.bids.length})
                  </Badge>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {product.bids.length === 0 && (
                <Text>You have no bidders yet on this product</Text>
              )}
              {product.bids.map(bid => {
                return (
                  <Flex
                    key={bid._id}
                    align="center"
                    mt="1rem"
                    bg="white"
                    key={product._id}
                    p="3"
                    rounded="md"
                  >
                    <Avatar
                      borderColor="teal"
                      size={'xs'}
                      mr=".7rem"
                      src={`${bid?.user?.avatar}`}
                    />
                    <Text>
                      {bid?.user?.firstName} {bid?.user?.lastName}
                    </Text>
                    <Text ml=".5rem" color="green" fontWeight="semibold">
                      ({bid?.amount} DA)
                    </Text>
                    <Box flex="1" textAlign="right">
                      <Button
                        colorScheme="blue"
                        isLoading={loadingConfirm}
                        loadingText="confirming"
                        onClick={() => confirmBid(product._id, bid.user._id)}
                      >
                        Accept the bid
                      </Button>
                    </Box>
                  </Flex>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </div>
  );
}
