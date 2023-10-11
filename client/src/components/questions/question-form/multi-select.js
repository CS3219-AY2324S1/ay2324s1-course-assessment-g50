import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "./question-form.css";

// Option Fields (hardcode or save to db?)
// prettier-ignore
const category_list = [
    "Algorithms", "Array", "String", "Hash Table", "Math", "Data Structures", "Dynamic Programming", "Sorting", 
    "Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search", 
    "Tree", "Matrix", "Two Pointers", "Binary Tree", "Bit Manipulation", 
    "Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Simulation", 
    "Design", "Counting", "Backtracking", "Sliding Window", "Union Find", 
    "Linked List", "Ordered Set", "Enumeration", "Monotonic Stack", "Trie", 
    "Recursion", "Divide and Conquer", "Bitmask", "Number Theory", "Queue", 
    "Binary Search Tree", "Segment Tree", "Memoization", "Geometry", "Topological Sort", 
    "Binary Indexed Tree", "Hash Function", "Game Theory", "Shortest Path", "Combinatorics", 
    "Interactive", "String Matching", "Data Stream", "Rolling Hash", "Brainteaser", 
    "Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency", 
    "Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort", 
    "Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", 
    "Reservoir Sampling", "Strongly Connected", "Component", "Eulerian Circuit", 
    "Radix Sort", "Rejection Sampling", "Biconnected Component"
  ];

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

function getStyles(cat, catList, theme) {
  return {
    fontWeight:
      catList.indexOf(cat) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelect = ({ categories, onChange }) => {
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
          {category_list.map((cat) => (
            <MenuItem
              key={cat}
              value={cat}
              style={getStyles(cat, category_list, theme)}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const difficulties = ["Easy", "Medium", "Hard"]
export const SingleSelect = ({ complexity, onChange }) => {
  return (
    <select name="complexity" value={complexity} onChange={onChange} className="field">
      <option value="" disabled hidden>
        Complexity
      </option>
      {difficulties.map((dif, i) => (
        <option value={dif} key={i}>
          {dif}
        </option>
      ))}
    </select>
  )
}
