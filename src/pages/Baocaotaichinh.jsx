import React from 'react'
import FinancialReportTable from '../components/Financialreporttable';
import { useState } from "react";

const Baocaotaichinh = () => {
  return (
    <div>
       <FinancialReportTable csvPath="/financialreport/metadata_vip.csv" />

    </div>
  )
}

export default Baocaotaichinh
