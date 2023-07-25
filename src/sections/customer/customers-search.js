import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Button, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";

export const CustomersSearch = ({ handleSetCounter }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Buscar cliente"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />

    <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={handleSetCounter}>
      <RefreshIcon sx={{ margin: 0 }} />
    </Button>
  </Card>
);

CustomersSearch.propTypes = {
  handleSetCounter: PropTypes.func,
};
