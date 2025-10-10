import { DynamicTable } from "@/components/DynamicTable";

// Data array of objects with all data types, numbers, strings, booleans, dates
const data = [
  {
    name: "Suganya",
    age: 30,
    city: "Espoo",
    isStudent: true,
    date: new Date(),
    wentToSchool: true,
    personality: "introverted",
  },
  {
    name: "Sonia",
    age: 25,
    city: "Los Angeles",
    isStudent: false,
    date: new Date(),
  },
  {
    name: "Fizza",
    age: 28,
    city: "Chicago",
    isStudent: true,
    date: new Date(),
  },
];

const Example = () => {
  return (
    <div>
      <DynamicTable data={data} />
    </div>
  );
};

export default Example;