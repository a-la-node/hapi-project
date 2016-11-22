module.exports = {
  spy: {
    safety: 'lt&f1_max=1',
    budget: 'lt&f2_max=500',
    description: 'Spy'
  },
  criminal: {
    safety: 'lt&f1_max=2',
    budget: 'lt&f2_max=1000',
    description: 'Rehabilitating criminal'
  },
  witness: {
    safety: 'gt&f1_min=4',
    budget: 'gt&f2_min=1500',
    description: 'Witness in need of protection'
  },
  spouse: {
    safety: 'gt&f1_min=4',
    budget: 'gt&f2_min=1500',
    description: 'Spouse on the down-low'
  },
  celeb: {
    safety: 'gt&f1_min=3',
    budget: 'gt&f2_min=3000',
    description: 'Z-list celebrity'
  },
  exec: {
    safety: 'gt&f1_min=3',
    budget: 'gt&f2_min=3000',
    description: 'Business executive in search of a tax haven'
  }
};
