import React from 'react';
import { useHistory } from "react-router";
import StandardTable from '../components/StandardTable';
import Loading from '../components/Loading';
import { sortAlphabetically } from '../utils/TableUtils';
import * as CoingeckoApi from '../api/CoingeckoApi';
import { Grid, Button } from '@mui/material';
import { WatchlistContext } from '../context/WatchlistProvider';

interface Column {
  id: 'name' | 'image' | 'price' | 'twentyFourHourHigh' | 'twentyFourHourLow' | 'marketCap';
  label: string;
  minWidth?: number;
  isImage?: boolean;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Coin', minWidth: 170 },
  { 
    id: 'image',
    label: '',
    minWidth: 170,
    isImage: true 
  },
  { 
    id: 'price',
    label: 'Price', 
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { 
    id: 'twentyFourHourHigh',
    label: '24h High',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { 
    id: 'twentyFourHourLow',
    label: '24h Low',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { 
    id: 'marketCap',
    label: 'Mkt Cap',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  id: string;
  name: string;
  image: string
  price: number;
  twentyFourHourHigh: number;
  twentyFourHourLow: number;
  marketCap: number;
}

function createData(
  id: string,
  name: string,
  image: string,
  price: number,
  twentyFourHourHigh: number,
  twentyFourHourLow: number,
  marketCap: number
): Data {
  return { id, name, image, price, twentyFourHourHigh, twentyFourHourLow, marketCap };
}

export default function Coins() {
  const [allData, setAllData] = React.useState([]);
  const { watchList } = React.useContext(WatchlistContext);
  const [dataDisplaying, setDataDisplaying] = React.useState('all');
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    const onLoad = async () => {
      const rows: any = [];
      let coinsData: any = [];

      try {
        coinsData = await CoingeckoApi.getCoinsData();
        coinsData.map((coin: any) => (
          rows.push(createData(coin.id, coin.name, coin.image, coin.current_price, coin.high_24h, coin.low_24h, coin.market_cap))
        ));
        const sortedRows = rows.sort((a: object, b: object) => sortAlphabetically(a, b, 'name'));
  
        setAllData(sortedRows);
        setTableData(sortedRows);
        if (tableData) setLoading(false);
      } catch (error) {
        console.error("Failed to fetch and set table data for all coins. Reason: ", error);
      }
    };
  
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDataSwitch = () => {
    if (dataDisplaying === 'all') {
      setTableData(watchList);
      setDataDisplaying('watchlist');
    } else if (dataDisplaying === 'watchlist') {
      setTableData(allData);
      setDataDisplaying('all');
    };
  };

  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Loading message="Won't be long, we're just loading the market data for you." />
    </div>
  );

  return (
    <Grid
      container
      display='flex'
      spacing={1}
      direction='column'
      alignItems="center"
      justifyContent="center"
    >

      {
        watchList.length > 0 ?
          <Grid item xs={12}>
            <Button 
              sx={{ minWidth: 345 }}
              variant="text"
              onClick={handleDataSwitch}
            >
              {
                dataDisplaying === 'all' ?
                  'Show Watchlist'
                :
                  'Show All'
              }
            </Button>
          </Grid>
        :
          null
      }

      <Grid item xs={12}>
        <StandardTable
          tableData={tableData}
          rowHeaders={[
            { title: "coin", columnSpan: 2 },
            { title: "details", columnSpan: 4 }
          ]}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onRowClick={(rowData: any) => history.push(`/${rowData.id}`)}
        />
      </Grid>
  </Grid>
  )
}