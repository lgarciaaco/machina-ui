import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useEffect, useState } from 'react';
import { getPositions, isAuthenticated } from '../api/api';

const LatestProducts = (props) => {
  const [appState, setAppState] = useState({
    auth: true,
    positions: [],
    error: null
  });

  useEffect(() => {
    if (isAuthenticated()) {
      getPositions().then((poss) => {
        setAppState({
          auth: true,
          positions: poss,
          error: null
        });
      }).catch((err) => {
        setAppState({ auth: false, positions: [], error: err });
      });
    } else {
      setAppState({ auth: false, positions: [] });
    }
  }, [setAppState]);

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${appState.positions.length} in total`}
        title="Latest Positions"
      />
      <Divider />
      <List>
        {appState.positions.map((position, i) => (
          <ListItem
            divider={i < appState.positions.length - 1}
            key={position.position_id}
          >
            <ListItemAvatar>
              <img
                alt={position.symbol}
                src={`/static/images/products/${position.symbol}.png`}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`Strategy: ${position.user}`}
              secondary={`Created ${moment(position.creation_time).fromNow()}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LatestProducts;
