import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BannedProductCard({
  product,
  fetchAll,
  reporter,
  description,
  reportId,
}) {
  const storeToken = localStorage.getItem('user-token');
  const [deleting, setDeleting] = useState(false);

  const deleteReport = async (productId, reportId) => {
    setDeleting(true);
    const res = await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/v1/reports/${reportId}/`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
        setDeleting(false);
      });

    if (res?.status === 204) {
      await deleteProduct(productId);
      fetchAll();
      setDeleting(false);
    }
  };

  const deleteProduct = async productId => {
    await axios
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
        toast.error(error.response.data.message);
        setDeleting(false);
      });
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
          src={product?.thumbnail}
        />
        <Box>
          <Text fontWeight="semibold">{product.name}</Text>
          <Badge>{product.category.name}</Badge>

          <Text fontSize="14px">
            Seller : {product?.user?.firstName} {product.user.lastName}
          </Text>
          <Text fontSize="14px">
            Reported by : {reporter?.firstName} {reporter?.lastName}
          </Text>
        </Box>
        <Box flexGrow="1" mx=".8rem" p="1rem" bg="gray.100">
          <Text>{description}</Text>
        </Box>
        <Box textAlign="right">
          <Button
            as="a"
            loadingText="deleting ..."
            isLoading={deleting}
            onClick={() => deleteReport(product._id, reportId)}
            leftIcon={<HiTrash />}
            colorScheme="yellow"
            width="11rem"
            mb=".5rem"
          >
            Delete
          </Button>
          <br />
          <Button
            as={BrowserLink}
            to={`/products/${product._id}`}
            width="11rem"
            mb=".5rem"
          >
            View more
          </Button>{' '}
        </Box>
      </Flex>
    </div>
  );
}
