import React from 'react'
import Leads from './Leads'
import LeadForm from'./LeadForm'
import PropertyForm from './PropertyForm'
import LeadTable from './LeadTable'

const App = () => (
  <div className='app-root'>
    <Leads/>
    <div className='column'>
      <LeadTable/>
      <PropertyForm/>
      <LeadForm/>
    </div>
  </div>
)

export default App