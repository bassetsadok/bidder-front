import { MinusIcon } from '@chakra-ui/icons';
import { Link as BrowserLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  ListItem,
  ListIcon,
  List,
  Avatar,
} from '@chakra-ui/react';
import { HiCheckCircle, HiClock } from 'react-icons/hi';
import Countdown from 'react-countdown';

function ProductCard({ product, compact }) {
  const {
    name,
    _id,
    thumbnail,
    initialPrice,
    category,
    currentPrice,
    deadDate,
    user,
    expired,
    sold,
    closed,
  } = product;
  return (
    <Box
      as={BrowserLink}
      to={`/products/${_id}`}
      bg={useColorModeValue('white', 'gray.800')}
      borderWidth="2px"
      rounded="lg"
      position="relative"
      cursor="pointer"
      width={['100%', '100%', '49%', '49%']}
      overflow="hidden"
      _hover={{
        '& .thumbnail': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Box height="200px" overflow="hidden">
        <Image
          className="thumbnail"
          css={{ transition: 'all 250ms linear' }}
          src={thumbnail}
          objectFit="cover"
          height="100%"
          width="100%"
          objectPosition="center center"
          alt={`Picture of ${name}`}
          roundedTop="lg"
        />
      </Box>
      <Box p="6" bg="gray.100">
        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
          {category.name}
        </Badge>
        <br />
        {expired && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="yellow">
            EXPIRED
          </Badge>
        )}
        {sold && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="yellow">
            sold
          </Badge>
        )}
        {closed && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="yellow">
            closed
          </Badge>
        )}
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            textTransform="capitalize"
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            mb="1rem"
          >
            {name}
          </Box>
        </Flex>
        {compact && (
          <Text fontWeight="semibold">{product.currentPrice} DA</Text>
        )}
        {!compact && (
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MinusIcon} color="green.500" />
              <Badge>initial Price: {initialPrice.toFixed(2)} DA</Badge>
            </ListItem>
            <ListItem>
              <ListIcon as={HiCheckCircle} color="green.500" />
              <Badge colorScheme="green.300">
                current Price: {currentPrice.toFixed(2)} DA
              </Badge>
            </ListItem>
            <ListItem>
              <ListIcon as={HiClock} color="green.500" />
              <Badge colorScheme="yellow">
                <Countdown
                  renderer={props => (
                    <Text>
                      {props.days} days | {props.hours}:{props.minutes} :
                      {props.seconds}
                    </Text>
                  )}
                  date={deadDate}
                />
              </Badge>
            </ListItem>
          </List>
        )}
        {compact && (
          <Flex align="center" mt="1rem" bg="white" p="3" rounded="md">
            <Avatar
              borderColor="teal"
              size={'xs'}
              mr=".3rem"
              src={`${user?.avatar}`}
            />
            <Text fontSize="14px">
              {user?.firstName} {user?.lastName}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default ProductCard;
