import React from 'react'
import Leads from './Leads'
import LeadForm from'./LeadForm'
import PropertyForm from './PropertyForm'
import LeadTable from './LeadTable'

const App = () => (
  <div className='app-root'>
  <LeadTable/>
    <div className='column'>
      <PropertyForm/>
      <LeadForm/>
    </div>
  </div>
)

export default App