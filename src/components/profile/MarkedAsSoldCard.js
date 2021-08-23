import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function MarkedAsSoldCard({ product, fetchAll }) {
  console.log(product, 'AcceptedSellingBidCard');

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
          <Badge size="lg" colorScheme="yellow">
            SOLD
          </Badge>
        </Box>
      </Flex>
    </div>
  );
}
