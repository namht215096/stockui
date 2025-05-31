import React from 'react'
import Table from '../components/Table.jsx';
import { useState } from "react";
import Button from '../components/Button.jsx';
import Kltable from '../components/Kltable.jsx';
import VolumeAdditional from '../components/Volumeaddition.jsx';

const Khoiluonggd = () => {
  return (
    <div>
        <Kltable folder="Kldd" />
        <VolumeAdditional folder="volumeadd"/>
    </div>
  )
}

export default Khoiluonggd
