import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function MarkedAsSoldCard({ product, fetchAll }) {
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

          <Badge size="lg" colorScheme="red">
            expired
          </Badge>
        </Box>
      </Flex>
    </div>
  );
}
