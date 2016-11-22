module.exports = {
  spy: {
    safety: 'lt&f1_max=1',
    budget: 'lt&f2_max=500'
  },
  criminal: {
    safety: 'lt&f1_max=2',
    budget: 'lt&f2_max=1000'
  },
  witness: {
    safety: 'gt&f1_min=4',
    budget: 'gt&f2_min=1500'
  },
  spouse: {
    safety: 'gt&f1_min=4',
    budget: 'gt&f2_min=1500'
  },
  celeb: {
    safety: 'gt&f1_min=3',
    budget: 'gt&f2_min=3000'
  },
  exec: {
    safety: 'gt&f1_min=3',
    budget: 'gt&f2_min=3000'
  }
};
