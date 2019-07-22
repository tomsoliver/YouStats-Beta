import { DataSet } from './dataElement';
import { GovernmentTerm, PoliticalParty } from './governmentTerm';


export const policticalParties: PoliticalParty[] = [
  {
    name: 'Conservatives',
    colour: 'blue'
  },
  {
    name: 'Labour',
    colour: 'red'
  }
];

export const TestGovernements: GovernmentTerm[] = [
  {
    party: policticalParties[1],
    startDate: new Date(1985, 0, 1),
    endDate: new Date(1989, 0, 1),
    leader: '',
    color: 'blue'
  },
  {
    party: policticalParties[1],
    startDate: new Date(1989, 0, 1),
    endDate: new Date(1991, 0, 1),
    leader: '',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(1991, 0, 1),
    endDate: new Date(1996, 0, 1),
    leader: '',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(1996, 0, 1),
    endDate: new Date(2000, 0, 1),
    leader: '',
    color: 'blue'
  },
  {
    party: policticalParties[1],
    startDate: new Date(2000, 0, 1),
    endDate: new Date(2003, 0, 1),
    leader: 'Tony Blair',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(2003, 0, 1),
    endDate: new Date(2007, 0, 1),
    leader: 'Tony Blair',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(2007, 0, 1),
    endDate: new Date(2010, 0, 1),
    leader: 'Gordon Brown',
    color: 'red'
  },
  {
    party: policticalParties[0],
    startDate: new Date(2010, 0, 1),
    endDate: new Date(2014, 0, 1),
    leader: 'David Cameron',
    color: 'blue'
  },
  {
    party: policticalParties[0],
    startDate: new Date(2014, 0, 1),
    endDate: new Date(2016, 0, 1),
    leader: 'David Cameron',
    color: 'blue'
  },
  {
    party: policticalParties[0],
    startDate: new Date(2016, 0, 1),
    endDate: new Date(2018, 0, 1),
    leader: 'Teresa May',
    color: 'blue'
  },
];

export const TestData1: DataSet = {
  id: '0',
  name: 'NHS Funding',
  xAxisName: 'Year',
  yAxisName: 'Amount (Millions of £)',
  lastUpdated: new Date(2018, 10, 23),
  data: [
    {
      x: new Date(1986, 0, 1),
      y: 26000000,
      tooltip: '£26 million'
    },
    {
      x: new Date(1987, 0, 1),
      y: 27000000,
      tooltip: '£27 million'
    },
    {
      x: new Date(1988, 0, 1),
      y: 28000000,
      tooltip: '£28 million'
    },
    {
      x: new Date(1989, 0, 1),
      y: 29000000,
      tooltip: '£29 million'
    },
    {
      x: new Date(1990, 0, 1),
      y: 30000000,
      tooltip: '£30 million'
    },
    {
      x: new Date(1991, 0, 1),
      y: 29000000,
      tooltip: '£29 million'
    },
    {
      x: new Date(1992, 0, 1),
      y: 30000000,
      tooltip: '£30 million'
    },
    {
      x: new Date(1993, 0, 1),
      y: 31000000,
      tooltip: '£31 million'
    },
    {
      x: new Date(1994, 0, 1),
      y: 32000000,
      tooltip: '£32 million'
    },
    {
      x: new Date(1995, 0, 1),
      y: 32000000,
      tooltip: '£32 million'
    },
    {
      x: new Date(1996, 0, 1),
      y: 33000000,
      tooltip: '£33 million'
    },
    {
      x: new Date(1997, 0, 1),
      y: 34000000,
      tooltip: '£34 million'
    },
    {
      x: new Date(1998, 0, 1),
      y: 35000000,
      tooltip: '£35 million'
    },
    {
      x: new Date(1999, 0, 1),
      y: 33000000,
      tooltip: '£33 million'
    },
    {
      x: new Date(2000, 0, 1),
      y: 35000000,
      tooltip: '£35 million'
    },
    {
      x: new Date(2001, 0, 1),
      y: 36000000,
      tooltip: '£36 million'
    },
    {
      x: new Date(2002, 0, 1),
      y: 38000000,
      tooltip: '£38 million'
    },
    {
      x: new Date(2003, 0, 1),
      y: 39000000,
      tooltip: '£39 million'
    },
    {
      x: new Date(2004, 0, 1),
      y: 41000000,
      tooltip: '£41 million'
    },
    {
      x: new Date(2005, 0, 1),
      y: 40000000,
      tooltip: '£40 million'
    },
    {
      x: new Date(2006, 0, 1),
      y: 40000000,
      tooltip: '£40 million'
    },
    {
      x: new Date(2007, 0, 1),
      y: 41000000,
      tooltip: '£41 million'
    },
    {
      x: new Date(2008, 0, 1),
      y: 42000000,
      tooltip: '£42 million'
    },
    {
      x: new Date(2009, 0, 1),
      y: 44000000,
      tooltip: '£44 million'
    },
    {
      x: new Date(2010, 0, 1),
      y: 48000000,
      tooltip: '£48 million'
    },
    {
      x: new Date(2011, 0, 1),
      y: 44000000,
      tooltip: '£44 million'
    },
    {
      x: new Date(2012, 0, 1),
      y: 43000000,
      tooltip: '£43 million'
    },
    {
      x: new Date(2013, 0, 1),
      y: 44000000,
      tooltip: '£44 million'
    },
    {
      x: new Date(2014, 0, 1),
      y: 45000000,
      tooltip: '£45 million'
    },
    {
      x: new Date(2015, 0, 1),
      y: 47000000,
      tooltip: '£47 million'
    },
    {
      x: new Date(2016, 0, 1),
      y: 48000000,
      tooltip: '£48 million'
    },
    {
      x: new Date(2017, 0, 1),
      y: 48000000,
      tooltip: '£48 million'
    },
    {
      x: new Date(2018, 0, 1),
      y: 49000000,
      tooltip: '£49 million'
    },
  ],
  sourceUrls: []
};

export const TestData2: DataSet = {
  id: '0',
  name: 'Police Funding',
  xAxisName: 'Year',
  yAxisName: 'Amount (Millions of £)',
  lastUpdated: new Date(2018, 10, 23),
  data: [
    {
      x: new Date(1986, 0, 1),
      y: 32000000,
      tooltip: '£32 million'
    },
    {
      x: new Date(1987, 0, 1),
      y: 31000000,
      tooltip: '£31 million'
    },
    {
      x: new Date(1988, 0, 1),
      y: 28000000,
      tooltip: '£30 million'
    },
    {
      x: new Date(1989, 0, 1),
      y: 29000000,
      tooltip: '£30 million'
    },
    {
      x: new Date(1990, 0, 1),
      y: 35000000,
      tooltip: '£35 million'
    },
    {
      x: new Date(1992, 0, 1),
      y: 33000000,
      tooltip: '£33 million'
    },
    {
      x: new Date(1993, 0, 1),
      y: 31000000,
      tooltip: '£31 million'
    },
    {
      x: new Date(1996, 0, 1),
      y: 32000000,
      tooltip: '£32 million'
    },
    {
      x: new Date(1997, 0, 1),
      y: 30000000,
      tooltip: '£30 million'
    },
    {
      x: new Date(1998, 0, 1),
      y: 29000000,
      tooltip: '£29 million'
    },
    {
      x: new Date(1999, 0, 1),
      y: 28000000,
      tooltip: '£28 million'
    },
    {
      x: new Date(2000, 0, 1),
      y: 28000000,
      tooltip: '£28 million'
    },
    {
      x: new Date(2003, 0, 1),
      y: 27000000,
      tooltip: '£27 million'
    },
    {
      x: new Date(2004, 0, 1),
      y: 27000000,
      tooltip: '£27 million'
    },
    {
      x: new Date(2006, 0, 1),
      y: 28000000,
      tooltip: '£28 million'
    },
    {
      x: new Date(2008, 0, 1),
      y: 19000000,
      tooltip: '£19 million'
    },
    {
      x: new Date(2009, 0, 1),
      y: 25000000,
      tooltip: '£25 million'
    },
    {
      x: new Date(2010, 0, 1),
      y: 28000000,
      tooltip: '£28 million'
    },
    {
      x: new Date(2011, 0, 1),
      y: 32000000,
      tooltip: '£32 million'
    },
    {
      x: new Date(2012, 0, 1),
      y: 36000000,
      tooltip: '£36 million'
    },
    {
      x: new Date(2015, 0, 1),
      y: 40000000,
      tooltip: '£40 million'
    },
    {
      x: new Date(2016, 0, 1),
      y: 42000000,
      tooltip: '£42 million'
    },
    {
      x: new Date(2017, 0, 1),
      y: 47000000,
      tooltip: '£47 million'
    },
    {
      x: new Date(2018, 0, 1),
      y: 51000000,
      tooltip: '£51 million'
    },
  ],
  sourceUrls: []
};
