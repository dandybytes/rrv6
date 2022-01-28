import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './index.css'

import App from './App'
import Expenses from './routes/Expenses'
import InvoiceList from './routes/InvoiceList'
import InvoiceItem from './routes/InvoiceItem'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='expenses' element={<Expenses />} />

        <Route path='invoices' element={<InvoiceList />}>
          <Route
            index
            element={
              <main style={{padding: '1rem'}}>
                <p>Select an invoice</p>
              </main>
            }
          />

          <Route path=':invoiceId' element={<InvoiceItem />} />
        </Route>

        <Route
          path='*'
          element={
            <main style={{padding: '1rem'}}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
)
