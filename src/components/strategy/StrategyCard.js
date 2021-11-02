import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/Money';

const truncate = (str, n) => (
  <span>
    {str.length > n ? `${str.substring(0, n)}...` : str}
  </span>
);

const StrategyCard = ({ strategy, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Product"
          src="/static/images/products/binance.png"
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {strategy.name}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {truncate(strategy.description, 120)}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <AccessTimeIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {`Running since ${moment(strategy.date_created).fromNow()}`}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <GetAppIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {strategy.positions_total}
            {' '}
            Positions
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

StrategyCard.propTypes = {
  strategy: PropTypes.object.isRequired
};

export default StrategyCard;
