
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CustomerLedgerTable } from './CustomerLedgerTable';

const CustomerLedgerTableProvider = () => (
    //App.tsx or AppProviders file
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomerLedgerTable />
    </LocalizationProvider>
);

export default CustomerLedgerTableProvider;