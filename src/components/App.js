import React from 'react'
import Leads from './Leads'
import LeadForm from'./LeadForm'
import PropertyForm from './PropertyForm'

const App = () => (
  <div className='app-root'>
    <Leads/>
    <PropertyForm/>
    <LeadForm/>
  </div>
)

export default App