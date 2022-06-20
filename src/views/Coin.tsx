import React from 'react';
import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
  Grid,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams, useHistory } from 'react-router';
import Loading from '../components/Loading';
import * as CoingeckoApi from '../api/CoingeckoApi';
import { FavouritesContext } from '../context/FavouritesProvider';
import { useSnackbar } from 'notistack';

interface FilteredData {
  id: string;
  name: string;
  image: string
  price: number;
  marketCap: number;
  description: string;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const checkIfFavourite = (favourites: FilteredData[], coinId: string) => {
  const isFavourite = favourites.find((favourite: FilteredData) => favourite.id === coinId) ? true : false;
  return isFavourite;
};

export default function Coin() {
  const params: { coinId: string } = useParams();
  const [coinData, setCoinData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const { favourites, setFavourites } = React.useContext(FavouritesContext);
  const [isFavourite, setIsFavourite] = React.useState<boolean>(checkIfFavourite(favourites, params.coinId));
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const isFavourite = checkIfFavourite(favourites, params.coinId);
    setIsFavourite(isFavourite)
  }, [favourites]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const onLoad = async () => {
      try {
        const unfilteredCoinData: any = await CoingeckoApi.getCoinData(params.coinId);
        const filteredCoinData: FilteredData = {
          id: unfilteredCoinData.id,
          name: unfilteredCoinData.name,
          image: unfilteredCoinData.image.large,
          price: unfilteredCoinData.market_data.current_price.aud,
          marketCap: unfilteredCoinData.market_data.market_cap.aud,
          description: unfilteredCoinData.description.en,
          circulatingSupply: unfilteredCoinData.market_data.circulating_supply,
          totalSupply: unfilteredCoinData.market_data.total_supply,
          maxSupply: unfilteredCoinData.market_data.max_supply,
        };
        setCoinData(filteredCoinData);
        if (coinData) setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch and set data for coin ID: ${params.coinId}. Reason: `, error);
      }
    };
  
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavouriteClick = () => {
    try {
      if (isFavourite) {
        const newFavourites: FilteredData[] = favourites.filter((newFavourite: FilteredData) => newFavourite.id !== coinData.id);
        setFavourites(newFavourites);
      } else {
        setFavourites([...favourites, coinData]);
      };
    } catch (error) {
      console.error(`Failed to ${isFavourite ? 'remove from' : 'add to'} favourites. Reason: `, error);
    } finally {
      enqueueSnackbar(`${coinData.name} ${isFavourite ? 'removed from' : 'added to'} favourites`, { variant: 'info' });
    }
  };

  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Loading message={`Won't be long, we're just loading the data for ${params.coinId}.`} />
    </div>
  );

  return (
    <Grid
      container
      display='flex'
      spacing={2}
      direction='column'
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 345, minWidth: 345 }}>
          <CardHeader title={coinData.name}/>
            <CardMedia
              component="img"
              height="140"
              image={coinData.image}
              alt={`${coinData.name} image`}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Current Price
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`$${coinData.price}`}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Market Cap
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`$${coinData.marketCap}`}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Circulating Supply
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {coinData.circulatingSupply}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Total Supply
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {coinData.totalSupply}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Max Supply
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {coinData.maxSupply}
              </Typography>
            </CardContent>

          <CardActions disableSpacing>
            <IconButton onClick={handleFavouriteClick} aria-label="favourites button">
              <FavoriteIcon color={isFavourite ? 'error' : 'disabled'}/>
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph>
                {coinData.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Button 
          sx={{ maxWidth: 345, minWidth: 345 }}
          variant="text"
          onClick={history.goBack}
        >
          Go Back
        </Button>
      </Grid>
    </Grid>
  );
}
