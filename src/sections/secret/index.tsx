import { Helmet } from 'react-helmet-async'

import { SecretListView } from './view'

// ----------------------------------------------------------------------

export default function SecretListPage() {
  return (
    <>
      <Helmet>
        <title> Kind: Secret List</title>
      </Helmet>

      <SecretListView />
    </>
  )
}
