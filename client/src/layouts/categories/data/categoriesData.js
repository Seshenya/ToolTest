export default function CategoriesTableData() {
  return {
    columns: [
      { Header: 'Type', accessor: 'type', align: 'left' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],
  };
}
