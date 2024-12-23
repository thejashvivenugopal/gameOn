
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LedgerTable from './LedgerTable';

const LedgerTableProvider = () => (
    //App.tsx or AppProviders file
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <LedgerTable />
    </LocalizationProvider>
);

export default LedgerTableProvider;