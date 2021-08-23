import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
  Heading,
} from '@chakra-ui/react';
import { FcAssistant, FcInTransit, FcMoneyTransfer } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack border="1px" p="10" rounded="xl" borderColor="gray.100">
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box>
      <Container
        py="20"
        maxW={['container.sm', 'container.md', 'container.lg', 'container.lg']}
      >
        <Heading mb="10">
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '20%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'teal.200',
              zIndex: -1,
            }}
          >
            Why us ?
          </Text>
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={'Lifetime Support'}
            text={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
            }
          />
          <Feature
            icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
            title={'Funding Garentee'}
            text={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={'Instant Delivery'}
            text={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
            }
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
