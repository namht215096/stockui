import React from 'react'
import Table from '../components/Table.jsx';
import { useState } from "react";
import Comparison from '../components/Comparision.jsx';

const Luanchuyentien = () => {
  return (
    <div>
        <Table folder="luanchuyentien" />
        <Comparison />
    </div>
  )
}

export default Luanchuyentien
