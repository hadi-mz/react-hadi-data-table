import React from 'react'

import { ExampleComponent } from './index'
import 'react-hadi-data-table/dist/index.css'
import "./style.css"
import DataTable from './DataTable'
const App = () => {
  return <>
    <DataTable deleteButton={true} theme="green" data={[
      { name: "ali", family: "rezaei", age: 18, retired: true },
      { name: "ali", family: "rezaei", age: 15, retired: true },
      { name: "reza", family: "rezaei", age: 14, retired: false },
      { name: "taghi", family: "rezaei", age: 11, retired: true },
      { name: "ahmad", family: "rezaei", age: 13, retired: false },
      { name: "ali", family: "rezaei", age: 21, retired: true },
    ]} />

    <DataTable deleteButton={true} theme="blue" columns={["first name", "last name", "age", "retired"]} data={[
      { name: "ali", family: "rezaei", age: 18, retired: true },
      { name: "ali", family: "rezaei", age: 15, retired: false },
      { name: "reza", family: "rezaei", age: 14, retired: true },
      { name: "taghi", family: "rezaei", age: 11, retired: true },
      { name: "ahmad", family: "rezaei", age: 13, retired: false },
      { name: "ali", family: "rezaei", age: 21, retired: true },
    ]} />
    <DataTable deleteButton={true} theme="orange" data={[
      { width: 3, length: 6 },
      { width: 4, length: 6 },
      { width: 2, length: 6 },
      { width: 3, length: 8 },
      { width: 3, length: 6 },
      { width: 3, length: 6 },
    ]} />

  </>
}

export default App
