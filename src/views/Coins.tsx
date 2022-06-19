import React from 'react';
import { useHistory } from "react-router";

import StandardTable from '../components/StandardTable';
import Loading from '../components/Loading';

import { sortAlphabetically } from '../utils/TableUtils';

import * as CoingeckoApi from '../api/CoingeckoApi';

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
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
  
        setTableData(sortedRows);
        if (tableData) setLoading(false);
      } catch (error) {
        console.error("Failed to fetch and set table data for all coins. Reason: ", error);
      }
    };
  
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Loading message="Won't be long, we're just loading the market data for you." />
    </div>
  );

  return (
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
  )
}