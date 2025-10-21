import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';

const StatsCard = ({
  title,
  value,
  change,
  changeType = 'increase', // 'increase' | 'decrease'
  icon,
  helpText,
  ...props
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={cardBg} shadow="md" {...props}>
      <CardBody>
        <Stat>
          <StatLabel fontSize="sm" color="gray.500" display="flex" alignItems="center">
            {icon && <Icon as={icon} mr={2} />}
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value}
          </StatNumber>
          {change && (
            <StatHelpText>
              <StatArrow type={changeType} />
              {change}
              {helpText && ` ${helpText}`}
            </StatHelpText>
          )}
        </Stat>
      </CardBody>
    </Card>
  );
};

export default StatsCard;