import * as React from 'react'
import {useLocation, NavLink, Outlet, useSearchParams} from 'react-router-dom'

import {getInvoices} from '../data'

function QueryNavLink({to, ...props}) {
  const location = useLocation()
  return <NavLink to={to + location.search} {...props} />
}

export default function InvoiceList() {
  const invoices = getInvoices()
  const [searchParams, setSearchParams] = useSearchParams({replace: true})

  const searchQuery = searchParams.get('filter')

  return (
    <div style={{display: 'flex'}}>
      <nav style={{borderRight: 'solid 1px', padding: '1rem'}}>
        <input
          value={searchQuery || ''}
          onChange={event => {
            const filter = event?.target?.value
            if (filter) {
              setSearchParams({filter}, {replace: true})
            } else {
              setSearchParams({}, {replace: true})
            }
          }}
        />

        {invoices
          .filter(invoice => searchQuery ? invoice.name.toLowerCase().startsWith(searchQuery.toLowerCase()) : true)
          .map(invoice => (
            <QueryNavLink
              key={invoice.number}
              style={({isActive}) => ({
                display: 'block',
                margin: '1rem 0',
                color: isActive ? 'red' : ''
              })}
              to={`/invoices/${invoice.number}`}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>

      <Outlet />
    </div>
  )
}
