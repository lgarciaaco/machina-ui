import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import StrategyListToolbar from '../components/strategy/StrategyListToolbar';
import StrategyCard from '../components/strategy/StrategyCard';
import { getUsers, isAuthenticated } from '../components/api/api';

const StrategyList = () => {
  const [appState, setAppState] = useState({
    auth: true,
    strategies: [],
    error: null
  });

  useEffect(() => {
    if (isAuthenticated()) {
      getUsers().then((usrs) => {
        setAppState({
          auth: true,
          strategies: usrs,
          error: null
        });
      }).catch((err) => {
        console.log(err);
        setAppState({ auth: false, strategies: [], error: err });
      });
    } else {
      setAppState({ auth: false, strategies: [] });
    }
  }, [setAppState]);

  return (
    <>
      <Helmet>
        <title>Strategies | Machina</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <StrategyListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {appState.strategies.map((strategy) => (
                <Grid
                  item
                  key={strategy.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <StrategyCard strategy={strategy} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default StrategyList;
