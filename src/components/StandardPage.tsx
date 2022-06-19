import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

const PageSubtitle = (options: {
  subtitle?: string 
}) => {
  if (!options.subtitle) return <></>;

  return (<Typography variant="body2" gutterBottom color="textSecondary">{options.subtitle}</Typography>);
};

export default function StandardPage(options: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {

  return (
    <Box display="flex" justifyContent="center">
      <title>{options.title}</title>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={5}
          >

            {/* Title and subtitle (optional) */}
            <Box mr={2}>
              <Typography align="center" variant="h4" component='h1' gutterBottom>
                {options.title}
              </Typography>
              <PageSubtitle subtitle={options.subtitle}/>
            </Box>

          </Box>

          {options.children}

        </Container>
    </Box>
  )
};

