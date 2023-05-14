import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const Find = ({ passSetShoes }) => {
  const [category, setCategory] = useState("");
  const [shoes, setShoes] = useState("");

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    if (category === "") {
      const data = await fetch("http://localhost:3000/Shoes");
      const shoes2 = await data.json();
      setShoes(shoes2);
      passSetShoes(shoes2);
    } else {
      const data = await fetch("http://localhost:3000/Shoes/find/" + category);
      const shoes2 = await data.json();
      setShoes(shoes2);
      passSetShoes(shoes2);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: -2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Kategorija</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Kategorija"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Patike"}>Patike</MenuItem>
          <MenuItem value={"Štikle"}>Štikle</MenuItem>
          <MenuItem value={"Čizme"}>Čizme</MenuItem>
          <MenuItem value={"Cipele"}>Cipele</MenuItem>
          <MenuItem value={"Papuče"}>Papuče</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Find;
