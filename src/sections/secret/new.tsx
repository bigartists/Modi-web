import { Helmet } from 'react-helmet-async'

import { InvoiceCreateView } from './view'

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Create a new secret</title>
      </Helmet>

      <InvoiceCreateView />
    </>
  )
}
