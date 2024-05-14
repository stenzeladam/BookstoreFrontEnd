import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const HomePage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {fetchOrders()}, [])

    const fetchOrders = async () => {
        const response = await fetch('http://localhost:3000/api/orders');
        const data = await response.json();   
        setOrders(data);
    }

    const columns = [
        { field: 'order_id', headerName: 'Order ID: ', headerAlign: 'center', type: 'number', width: 100, align: 'center'},
        { field: 'title', headerName: 'Title: ', headerAlign: 'left', width: 255 },
        { field: 'author', headerName: 'Author: ', headerAlign: 'left', width: 150 },
        { field: 'price', headerName: 'Price: ', headerAlign: 'center', type: 'number', width: 130, align: 'center' },
        { field: 'quantity', headerName: 'Quantity', headerAlign: 'left', type: 'number', width: 160, align: 'left'},
      ];

    const rows = orders.map(order => {
        return { ...order, id: order.order_id };
    });

    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      );
};

export default HomePage;
