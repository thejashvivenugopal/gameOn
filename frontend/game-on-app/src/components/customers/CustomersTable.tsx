import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import '../../styles/tables/Tables.css'
import { toast } from 'react-toastify';
import { CustomersModel } from '../../types/types';
import { ownersApi, customersApi } from '../../apis/endpoints';

export const CustomersTable = () => {

    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<CustomersModel[]>([]);

    const toastShown = useRef<boolean>(false);


    const handleSubmit = async () => {
        setLoading(true); // Start loading
        try {
            const userId: any = localStorage.getItem('userId');
            const userRole: any = localStorage.getItem('userRole');
            console.log(userRole);
            
            let response;
            // Send GET request to the API
            if(userRole === 'ADMIN'){
                response = await fetch(customersApi.fetchAllCustomers, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ownerId': userId,
                        'Authorization' :`Bearer ${localStorage.getItem('token')}`
                    }
                });

            }else{
                response = await fetch(ownersApi.fetchCustomersByOwnerId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ownerId': userId,
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                }
            });

            }
            

            const data: any = await response.json();
            setData(data)


            if (response.ok) {
                if (!toastShown.current) {
                    // Handle login
                    toast.success('Customers fetched successfully');
                    toastShown.current = true
                }

            } else {
                if (!toastShown.current) {
                    // Handle failure
                    toast.error(data.message || 'Fetch failed. Please try again.');
                    setError(data.message || 'Fetch failed. Please try again.');
                    toastShown.current = true
                }
            }
        } catch (error) {
            if (!toastShown) {
                toast.error('An error occurred. Please try again later.');
                setError('An error occurred. Please try again later.');
                console.error('Error during API call:', error);
                toastShown.current = true
            }
        } finally {
            if (!toastShown) {
                setLoading(false);
                toastShown.current = true
            } // Stop loading
        }
    };

    useEffect(() => {
        handleSubmit();

    }, []);

    const columns = useMemo<MRT_ColumnDef<CustomersModel>[]>(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                filterVariant: 'text',
                // filterSelectOptions: "text", //custom options list (as opposed to faceted list)
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                filterVariant: 'text', // default
                size: 200,
            },
            {
                accessorFn(originalRow) {
                    const date = new Date(originalRow.createdDate);
                    const formattedDate = date.toLocaleDateString("en-GB", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })
                    const formattedTime = date.toLocaleTimeString("en-GB", {
                        timeStyle: "medium",
                        hour12: true,  // Use 24-hour format, set to true for 12-hour format with AM/PM
                    });
                    return (
                        <div>
                            {formattedDate} <br />
                            {formattedTime}
                        </div>
                    )
                },
                id: 'createdDate',
                header: 'Created Time',
                // filterVariant: 'datetime-range'
            },
            {
                accessorKey: 'mobileNumber',
                header: 'Mobile Number',
                filterVariant: 'text', // default
                size: 200,
            },
            {
                accessorKey: 'emailId',
                header: 'Email-ID',
                filterVariant: 'text', // default
                size: 200,
            }
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: { showColumnFilters: true },
        enablePagination: false,
    });

    return <>
        <MaterialReactTable table={table} />
    </>;
};

export default CustomersTable;
