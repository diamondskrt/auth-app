import omit from 'lodash.omit'

import { Resource } from './config'
import { UUID } from './model'

const convertData = <T extends object>({
  resource,
  data,
  id,
}: {
  resource: Resource
  data: T
  id?: UUID
}) => {
  const convertedData = {
    data: {
      type: resource,
      id,
      attributes: omit(data, 'id'),
    },
  }

  return convertedData
}

export { convertData }
