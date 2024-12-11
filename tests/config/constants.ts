const testUser = {
  id: '9db2b722-6d6b-4383-ae8e-43b327b821ec',
  email: 'mail@mail.ru',
  fullName: 'test test',
  username: 'test005',
  merchantCode: 'TEST',
}

const abilityGroups = {
  data: [
    {
      type: 'ability-groups',
      id: '111',
      attributes: {
        name: 'admin',
        description: 'admin',
      },
    },
    {
      type: 'ability-groups',
      id: '222',
      attributes: {
        name: 'operator',
        description: 'operator',
      },
    },
    {
      type: 'ability-groups',
      id: '333',
      attributes: {
        name: 'merchant',
        description: 'merchant',
      },
    },
    {
      type: 'ability-groups',
      id: '4444',
      attributes: {
        name: 'worker',
        description: 'worker',
      },
    },
  ],
}

const profile = {
  data: {
    id: testUser.id,
    email: testUser.email,
    fullName: testUser.fullName,
    username: testUser.username,
    phone: null,
    merchantCode: testUser.merchantCode,
    isAdmin: true,
    additionalData: null,
    abilityGroups: ['admin'],
  },
}

const user = {
  data: {
    type: 'users',
    id: testUser.id,
    attributes: {
      fullName: testUser.fullName,
      email: testUser.email,
      username: testUser.username,
      merchantCode: testUser.merchantCode,
      phone: null,
      additionalData: null,
      activities: null,
      merchants: null,
      blockedAt: null,
      blockedTo: null,
    },
    relationships: {
      abilityGroups: {
        data: [
          {
            type: 'ability-groups',
            id: '111',
          },
        ],
      },
    },
  },
  included: [
    {
      type: 'ability-groups',
      id: '111',
      attributes: {
        name: 'admin',
        description: 'admin',
      },
    },
  ],
}

export { abilityGroups, profile, testUser, user }
