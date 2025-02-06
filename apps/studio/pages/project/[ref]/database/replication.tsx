import DatabaseLayout from 'components/layouts/DatabaseLayout/DatabaseLayout'
import type { NextPageWithLayout } from 'types'
import InstanceConfiguration from 'components/interfaces/Settings/Infrastructure/InfrastructureConfiguration/InstanceConfiguration'
import { FormHeader } from 'components/ui/Forms/FormHeader'

const DatabaseReplicationPage: NextPageWithLayout = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <FormHeader
        title="Database Replication"
        description="Send data to other destinations"
        className="px-8 py-8 mb-0"
      />
      <InstanceConfiguration />
    </div>
  )
}

DatabaseReplicationPage.getLayout = (page) => (
  <DatabaseLayout title="Database">{page}</DatabaseLayout>
)

export default DatabaseReplicationPage
