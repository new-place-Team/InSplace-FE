/* eslint-disable react/prop-types */
import React from 'react';
import theme from '../styles/theme';
import { Grid, Text } from '../elements';

const ContentsTitle = props => {
  const { title, color, search } = props;
  return (
    <Grid justify="space-between" margin="24px 0">
      <Grid>
        <Text fontSize="20px" color={color} bold>
          {title}
        </Text>
      </Grid>
      {search && <Grid>🔎</Grid>}
    </Grid>
  );
};
ContentsTitle.defaultProps = {
  color: `${theme.color.mainColor}`,
};

export default ContentsTitle;
