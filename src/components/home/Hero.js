import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { HiShoppingCart } from 'react-icons/hi';
import { Link as BrowserLink } from 'react-router-dom';
export default function CallToActionWithVideo() {
  const MotionBox = motion(Box);
  const MotionImage = motion(Image);
  return (
    <Box bg="gray.100" clipPath="polygon(0 0, 100% 0, 100% 100%, 0 90%)">
      <Container
        maxW={['container.sm', 'container.md', 'container.lg', 'container.lg']}
      >
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'teal.200',
                  zIndex: -1,
                }}
              >
                Connecting
              </Text>
              <br />
              <Text
                fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}
                as={'span'}
                color={'teal'}
              >
                Buyers & Sellers
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                as={BrowserLink}
                to="/products"
                rounded={'full'}
                size={'lg'}
                fontWeight={'bold'}
                px={12}
                colorScheme="teal"
                leftIcon={<HiShoppingCart h={4} w={4} color={'gray.300'} />}
              >
                SHOP NOW
              </Button>
            </Stack>
          </Stack>
          <Flex
            display={['none', 'none', 'none', 'flex']}
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('teal.50', 'teal.400')}
            />
            <MotionBox
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              width={'full'}
            >
              <MotionImage
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 40,
                  delay: 0,
                }}
                alt={'Hero Image'}
                rounded="lg"
                fit={'cover'}
                align={'center'}
                w={'70%'}
                h={'100%'}
                zIndex={30}
                src={
                  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80'
                }
              />
              <MotionImage
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                alt={'Hero Image'}
                rounded="lg"
                fit={'cover'}
                align={'center'}
                w={'50%'}
                h={'50%'}
                position={'absolute'}
                right={'0%'}
                bottom={'-15%'}
                src={
                  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
                }
              />

              <MotionImage
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 960,
                  damping: 250,
                  delay: 0.3,
                }}
                alt={'Hero Image'}
                rounded="lg"
                fit={'cover'}
                align={'center'}
                w={'70%'}
                h={'70%'}
                position={'absolute'}
                right={'-10%'}
                top={'-15%'}
                src={
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
                }
              />
            </MotionBox>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export const Blob = props => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
