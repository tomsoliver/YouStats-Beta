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
    startDate: new Date(1985, 0, 0),
    endDate: new Date(1989, 0, 0),
    leader: '',
    color: 'blue'
  },
  {
    party: policticalParties[1],
    startDate: new Date(1989, 0, 0),
    endDate: new Date(1991, 0, 0),
    leader: '',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(1991, 0, 0),
    endDate: new Date(1996, 0, 0),
    leader: '',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(1996, 0, 0),
    endDate: new Date(2000, 0, 0),
    leader: '',
    color: 'blue'
  },
  {
    party: policticalParties[1],
    startDate: new Date(2000, 0, 0),
    endDate: new Date(2003, 0, 0),
    leader: 'Tony Blair',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(2003, 0, 0),
    endDate: new Date(2007, 0, 0),
    leader: 'Tony Blair',
    color: 'red'
  },
  {
    party: policticalParties[1],
    startDate: new Date(2007, 0, 0),
    endDate: new Date(2010, 0, 0),
    leader: 'Gordon Brown',
    color: 'red'
  },
  {
    party: policticalParties[0],
    startDate: new Date(2010, 0, 0),
    endDate: new Date(2014, 0, 0),
    leader: 'David Cameron',
    color: 'blue'
  },
  {
    party: policticalParties[0],
    startDate: new Date(2014, 0, 0),
    endDate: new Date(2016, 0, 0),
    leader: 'David Cameron',
    color: 'blue'
  },
  {
    party: policticalParties[0],
    startDate: new Date(2016, 0, 0),
    endDate: new Date(2018, 0, 0),
    leader: 'Teresa May',
    color: 'blue'
  },
];

export const TestData: DataSet = {
  id: '0',
  name: 'NHS Funding',
  xAxisName: 'Year',
  yAxisName: 'Amount (Millions of £)',
  lastUpdated: new Date(2018, 10, 23),
  data: [
    {
      x: new Date(1986, 0, 0),
      y: 26,
      tooltip: '£26 million'
    },
    {
      x: new Date(1987, 0, 0),
      y: 27,
      tooltip: '£27 million'
    },
    {
      x: new Date(1988, 0, 0),
      y: 28,
      tooltip: '£28 million'
    },
    {
      x: new Date(1989, 0, 0),
      y: 29,
      tooltip: '£29 million'
    },
    {
      x: new Date(1990, 0, 0),
      y: 30,
      tooltip: '£30 million'
    },
    {
      x: new Date(1991, 0, 0),
      y: 29,
      tooltip: '£29 million'
    },
    {
      x: new Date(1992, 0, 0),
      y: 30,
      tooltip: '£30 million'
    },
    {
      x: new Date(1993, 0, 0),
      y: 31,
      tooltip: '£31 million'
    },
    {
      x: new Date(1994, 0, 0),
      y: 32,
      tooltip: '£32 million'
    },
    {
      x: new Date(1995, 0, 0),
      y: 32,
      tooltip: '£32 million'
    },
    {
      x: new Date(1996, 0, 0),
      y: 33,
      tooltip: '£33 million'
    },
    {
      x: new Date(1997, 0, 0),
      y: 34,
      tooltip: '£34 million'
    },
    {
      x: new Date(1998, 0, 0),
      y: 35,
      tooltip: '£35 million'
    },
    {
      x: new Date(1999, 0, 0),
      y: 33,
      tooltip: '£33 million'
    },
    {
      x: new Date(2000, 0, 0),
      y: 35,
      tooltip: '£35 million'
    },
    {
      x: new Date(2001, 0, 0),
      y: 36,
      tooltip: '£36 million'
    },
    {
      x: new Date(2002, 0, 0),
      y: 38,
      tooltip: '£38 million'
    },
    {
      x: new Date(2003, 0, 0),
      y: 39,
      tooltip: '£39 million'
    },
    {
      x: new Date(2004, 0, 0),
      y: 41,
      tooltip: '£41 million'
    },
    {
      x: new Date(2005, 0, 0),
      y: 40,
      tooltip: '£40 million'
    },
    {
      x: new Date(2006, 0, 0),
      y: 40,
      tooltip: '£40 million'
    },
    {
      x: new Date(2007, 0, 0),
      y: 41,
      tooltip: '£41 million'
    },
    {
      x: new Date(2008, 0, 0),
      y: 42,
      tooltip: '£42 million'
    },
    {
      x: new Date(2009, 0, 0),
      y: 44,
      tooltip: '£44 million'
    },
    {
      x: new Date(2010, 0, 0),
      y: 48,
      tooltip: '£48 million'
    },
    {
      x: new Date(2011, 0, 0),
      y: 44,
      tooltip: '£44 million'
    },
    {
      x: new Date(2012, 0, 0),
      y: 43,
      tooltip: '£43 million'
    },
    {
      x: new Date(2013, 0, 0),
      y: 44,
      tooltip: '£44 million'
    },
    {
      x: new Date(2014, 0, 0),
      y: 45,
      tooltip: '£45 million'
    },
    {
      x: new Date(2015, 0, 0),
      y: 47,
      tooltip: '£47 million'
    },
    {
      x: new Date(2016, 0, 0),
      y: 48,
      tooltip: '£48 million'
    },
    {
      x: new Date(2017, 0, 0),
      y: 48,
      tooltip: '£48 million'
    },
    {
      x: new Date(2018, 0, 0),
      y: 48,
      tooltip: '£48 million'
    },
  ],
  sourceUrls: []
};
