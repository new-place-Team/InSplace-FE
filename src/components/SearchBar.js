import React from 'react';
import { Grid, Text } from '../elements';

const SearchBar = () => {
  return (
    <Grid justify="space-between" padding="18px 0">
      <Grid isFlex>
        <Grid margin="0 10px 0 0">⬅</Grid>
        <Text fontSize="18px" bold color="#fff">
          검색결과
        </Text>
      </Grid>
      <Grid isFlex>
        <Grid margin="0 10px 0 0">🌍</Grid>
        <Grid>🔎</Grid>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
