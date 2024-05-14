import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const HomePage = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [error404Flag, set404] = useState(false);
    const [error500Flag, set500] = useState(false);
    const [otherErrorFlag, setOther] = useState(false);

    useEffect(() => {
        fetchData('http://localhost:3000/api/customers', setCustomers)
        fetchData('http://localhost:3000/api/orders', setOrders)
    }, [])

    const fetchData = async (url, setData) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // If the response status is not in the range 200-299 (success), throw an error
                const statusCode = response.status;
                if (statusCode === 404) {
                    set404(true);
                } else if (statusCode === 500) {
                    set500(true);
                } else {
                    setOther(true);
                }
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setOther(true);
        }
    }

    const ordersColumns = [
        { field: 'order_id', headerName: 'Order ID', headerAlign: 'center', type: 'number', width: 100, align: 'center'},
        { field: 'title', headerName: 'Title', headerAlign: 'left', width: 255 },
        { field: 'author', headerName: 'Author', headerAlign: 'left', width: 150 },
        { field: 'price', headerName: 'Price', headerAlign: 'center', type: 'number', width: 130, align: 'center' },
        { field: 'quantity', headerName: 'Quantity', headerAlign: 'left', type: 'number', width: 4600, align: 'left'},
      ];

    const ordersRows = orders.map(order => {
        return { ...order, id: order.order_id };
    });

    const customersColumns = [
        { field: 'name', headerName: 'Name', width: 255 },
        { field: 'email', headerName: 'E-mail', width: 255 },
        { field: 'address', headerName: 'Address', width: 4500 },
      ];

      const customersRows = customers.map(customer => {
        return { ...customer, id: customer.name };
    });

    if (error404Flag) {
        return (
            <div>404 Error: Page not found</div>
        );
    }
    if (error500Flag) {
        return (
            <div>500 Error: Internal Server Error</div>
        );
    }
    if (otherErrorFlag) {
        return (
            <div>An error has occurred</div>
        )
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <style>
            {`
            .custom-header {
                background-color: #000000; /* Set custom background color */
                color: #ffffff; /* Set custom text color */
            }

            .custom-header .MuiDataGrid-colCellTitle {
                color: #ff0000
            }
            `}
        </style>
        <DataGrid
            rows={ordersRows}
            columns={ordersColumns.map(column => ({
            ...column,
            headerClassName: 'custom-header', // Apply custom header class
            }))}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
        <DataGrid
            rows={customersRows}
            columns={customersColumns.map(column => ({
            ...column,
            headerClassName: 'custom-header', // Apply custom header class
            }))}
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
