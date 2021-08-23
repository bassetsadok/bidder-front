import { Badge, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { HiPhone } from 'react-icons/hi';

export default function AcceptedBuyBidCard({ product, fetchAll }) {
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
            Seller : {product?.user?.firstName} {product.user.lastName}
          </Text>
          <Text fontSize="14px">
            Phone :{' '}
            <Badge>
              {' '}
              <a href={`tel:${product.buyer.phoneNumber}`}>
                {product?.buyer?.phoneNumber}
              </a>
            </Badge>
          </Text>
          <Badge colorScheme="yellow">
            Pending your contact to pay {product.currentPrice} DA
          </Badge>
        </Box>
        <Box textAlign="right" flexGrow="1">
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
