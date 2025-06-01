import React from 'react'
import Table from '../components/Table.jsx';
import { useState } from "react";
import Button from '../components/Button.jsx';

const Candoikt = () => {
  return (
    <div>
        <Button endpoint="/crawl-taichinh-vip" />
        
        <Button endpoint="/crawl-taichinh-quy" />
        
        <Button endpoint="/crawl-giadongcua" />
        <Table folder="candoiketoan" />
    </div>
  )
}

export default Candoikt
