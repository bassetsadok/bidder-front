import {
  Heading,
  Avatar,
  Box,
  Center,
  Stack,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';

export default function SellerCard({ avatar, firstName, lastName, email }) {
  return (
    <Center py={6}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'lg'}
          src={`https://${avatar}`}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {firstName} {lastName}
        </Heading>
        <Badge>{email}</Badge>

        <Stack mt={8} direction={'row'} spacing={4}>
          {/* <Button
            flex={1}
            fontSize={'sm'}
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'teal.500',
            }}
            _focus={{
              bg: 'teal.500',
            }}
          >
            Check the profile
          </Button> */}
        </Stack>
      </Box>
    </Center>
  );
}
