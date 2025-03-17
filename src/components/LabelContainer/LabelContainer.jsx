import React from 'react'
import {Pencil} from 'lucide-react'
import './LabelContainer.scss'
function LabelContainer() {
  return (
    <div className='label-main-conatiner'>
        <div className='label-centre'>
            <Pencil className='label-icon'/>
            <p className='label-text'>Labels are under development !</p>
        </div>
    </div>
  )
}

export default LabelContainer
