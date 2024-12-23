
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomerTable from './CustomersTable';

const CustomersTableProvider = () => (
    //App.tsx or AppProviders file
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomerTable />
    </LocalizationProvider>
);

export default CustomersTableProvider;