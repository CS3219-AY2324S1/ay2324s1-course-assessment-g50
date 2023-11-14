import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({ availableCategories, categories, onChange }) => {
  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ mb: 2, width: "98%", fontSize: "16px" }}>
        <InputLabel id="cat-label">Categories</InputLabel>
        <Select
          labelId="multiple-cat-label"
          id="multiple-cat"
          multiple
          name="categories"
          value={categories}
          onChange={onChange}
          input={<OutlinedInput label="Categories" />}
          MenuProps={MenuProps}
        >
          {availableCategories && availableCategories.map((cat) => (
            <MenuItem
              key={cat}
              value={cat}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const SingleSelect = ({ availableComplexities, complexity, onChange }) => {
  return (
  <FormControl sx={{ mb: 2, width: "98%", fontSize: "16px" }}>
    <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={complexity}
      label="difficulty"
      onChange={onChange}
    > 
      {availableComplexities && availableComplexities.map((c) => {
        return (<MenuItem value={c} key={c}>{c}</MenuItem>)
      })}
    </Select>
  </FormControl>
  )
}

export { SingleSelect, MultipleSelect };