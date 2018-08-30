import React from 'react'
import Leads from './Leads'
import LeadForm from'./LeadForm'
import PropertyForm from './PropertyForm'

const App = () => (
  <div className='app-root'>
    <Leads/>
    <div className='column'>
      <PropertyForm/>
      <LeadForm/>
    </div>
  </div>
)

export default App