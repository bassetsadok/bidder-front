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

function ProductCardH({ product, compact }) {
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
    description,
  } = product;
  return (
    <Box
      as={BrowserLink}
      to={`/products/${_id}`}
      bg={'gray.100'}
      borderWidth="2px"
      rounded="lg"
      height="250px"
      position="relative"
      display="flex"
      alignItems="center"
      cursor="pointer"
      width={['100%', '100%', '100%', '100%']}
      overflow="hidden"
      _hover={{
        '& .thumbnail': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Box
        height="100%"
        display={['none', 'none', 'block', 'block']}
        width="300px"
        overflow="hidden"
      >
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
      <Box p="6" flexGrow="1" bg="gray.100">
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
            mb="0rem"
          >
            {name}
          </Box>
        </Flex>

        <Text fontWeight="semibold">{product.currentPrice} DA</Text>
        <Text fontSize="12px" mb="1rem">
          {description.substr(0, 80)} . . .
        </Text>
        <List spacing={1}>
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
        <Badge
          mt="2rem"
          rounded="full"
          px="2"
          fontSize="0.8em"
          colorScheme="red"
        >
          {category.name}
        </Badge>
        <br />
      </Box>
    </Box>
  );
}

export default ProductCardH;
