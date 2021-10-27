import React from 'react';
import { Grid, Text } from '../elements';

const SearchBar = props => {
  return (
    <Grid justify="space-between">
      <Grid isFlex>
        <Grid margin="0 10px 0 0">⬅</Grid>
        <Text fontSize="18px" bold>
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
