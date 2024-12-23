import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    MRT_Row,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import '../../styles/tables/Tables.css'
import { toast } from 'react-toastify';
import { LedgersModel } from '../../types/types';
import { ledgerApi } from '../../apis/endpoints';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share'; // Import Share Icon


export const CustomerLedgerTable = () => {

    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<LedgersModel[]>([]);

    const toastShown = useRef<boolean>(false);

    const handleShare = async (row: LedgersModel) => {

        const eventDetails = `
    You're invited to an event!
    Event Date: ${new Date(row.eventBookedDate).toLocaleDateString('en-GB')},
    Start Time: ${row.startTime}
    Amount: $${row.amount}
    Payment Status: ${row.paymentStatus ? 'Paid' : 'Pending'}
  `;
        const eventLocation = row.event.location?.locationLink ? row.event.location?.locationLink : ""
        if (navigator.share) {
            navigator.share({
                title: 'Event Invitation',
                text: eventDetails,
                url: eventLocation, // Replace with your event URL
            })
        }
        else {
            navigator.clipboard.writeText('Code we want')
        }
    }


    const handleSubmit = async () => {
        setLoading(true); // Start loading
        try {
            const userId: any = localStorage.getItem('userHashId');
            // Send GET request to the API
            const response = await fetch(ledgerApi.fetchByCustomer, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'id': userId,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data: any = await response.json();
            setData(data)


            if (response.ok) {
                if (!toastShown.current) {
                    // Handle successful login
                    toast.success('Ledger fetched successfully');
                    toastShown.current = true
                }

            } else {
                if (!toastShown.current) {
                    // Handle login failure
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

    const handleSuccess = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            // Verify the session on your server
            const response = await fetch(`http://localhost:3002/cart/verify-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ sessionId })
            });

            if (response.ok) {
                console.log('Payment success verified. Now hitting another API...');

                const ledger_response = await fetch(ledgerApi.fetch, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // console.log('test:',ledger_response.json());
                const ledger_data: any = await ledger_response.json();
                console.log(ledger_data);

                ledger_data.map(async (e: any) => {
                    if (e.customer.userHashId == localStorage.getItem('userHashId')) {
                        await fetch(`http://localhost:3002/ledgers`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'id': `${e.ledgerHashId}`,
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                "paymentStatus": true
                            })
                        })
                    }
                })
            } else {
                console.error('Failed to verify payment session.');
            }
        }
    };

    useEffect(() => {
        handleSubmit();
        handleSuccess();
    }, []);

    const columns = useMemo<MRT_ColumnDef<LedgersModel>[]>(
        () => [
            {
                accessorKey: 'event.eventType',
                header: 'Event',
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
                header: 'Transaction Time',
                // filterVariant: 'datetime-range'
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                filterVariant: 'text', // default
                size: 200,
            },
            {
                accessorKey: 'debit',
                header: 'Transaction Type',
                filterVariant: 'text', // default
                size: 200,
                Cell: ({ cell }) => {
                    const debit = cell.getValue<boolean>(); // Access the paymentStatus value

                    if (debit) {
                        return (
                            <button className='successButton'>
                                CREDIT
                            </button>
                        );
                    } else {
                        return (
                            <button className='failureButton'>
                                DEBIT
                            </button>
                        );
                    }
                },
            },
            {
                accessorKey: 'paymentStatus',
                header: 'Payment Status',
                filterVariant: 'text', // default
                size: 200,
                Cell: ({ cell }) => {
                    const paymentStatus = cell.getValue<boolean>(); // Access the paymentStatus value

                    if (paymentStatus) {
                        return (
                            <button className='successButton'>
                                SUCCESS
                            </button>
                        );
                    } else {
                        return (
                            <button className='failureButton'>
                                FAILURE
                            </button>
                        );
                    }
                },
            },
            {
                id: 'share',
                header: '', // Empty header
                Cell: ({ row }) => (
                    <IconButton onClick={() => handleShare(row.original)}>
                        <ShareIcon />
                    </IconButton>
                ),
                size: 50, // Adjust size as needed
            },
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

export default CustomerLedgerTable;
