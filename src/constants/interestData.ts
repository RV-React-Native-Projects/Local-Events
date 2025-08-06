import { Icons } from '@components/AppIcon/AppIconsDir';

export interface ICategoriesData {
  id: string;
  name: string;
  icon: Icons;
  description: string;
  examples: string[];
}

export const categories: ICategoriesData[] = [
  {
    id: 'music',
    name: 'Music & Audio',
    icon: Icons.music,
    description: 'Live performances, jam sessions, karaoke nights',
    examples: ['Jazz nights', 'Open mic', 'Concerts'],
  },
  {
    id: 'coffee',
    name: 'Coffee & Chat',
    icon: Icons.coffee,
    description: 'Casual meetups, networking, conversations',
    examples: ['Coffee talks', 'Networking', 'Book clubs'],
  },
  {
    id: 'art',
    name: 'Arts & Crafts',
    icon: Icons.art,
    description: 'Creative workshops, painting, DIY projects',
    examples: ['Painting', 'Pottery', 'Crafting'],
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Icons.photography,
    description: 'Photo walks, exhibitions, technique sharing',
    examples: ['Photo walks', 'Exhibitions', 'Workshops'],
  },
  {
    id: 'reading',
    name: 'Books & Poetry',
    icon: Icons.reading,
    description: 'Literary discussions, poetry readings',
    examples: ['Book clubs', 'Poetry', 'Readings'],
  },
  {
    id: 'games',
    name: 'Games & Sports',
    icon: Icons.games,
    description: 'Board games, chess, casual sports',
    examples: ['Chess', 'Board games', 'Sports'],
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    icon: Icons.food,
    description: 'Cooking classes, food tours, dining',
    examples: ['Cooking', 'Food tours', 'Tastings'],
  },
  {
    id: 'tech',
    name: 'Tech & Innovation',
    icon: Icons.tech,
    description: 'Coding meetups, startup events, demos',
    examples: ['Coding', 'Startups', 'Tech talks'],
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    icon: Icons.fitness,
    description: 'Yoga classes, running groups, meditation',
    examples: ['Yoga', 'Running', 'Meditation'],
  },
  {
    id: 'social',
    name: 'Social Impact',
    icon: Icons.social,
    description: 'Volunteering, community service, charity',
    examples: ['Volunteering', 'Charity', 'Community'],
  },
  {
    id: 'music-production',
    name: 'Music Production',
    icon: Icons.musicProduction,
    description: 'Beat making, mixing, electronic music',
    examples: ['Beat making', 'Mixing', 'Electronic'],
  },
  {
    id: 'business',
    name: 'Business & Career',
    icon: Icons.business,
    description: 'Professional networking, career development',
    examples: ['Networking', 'Career', 'Business'],
  },
  {
    id: 'learning',
    name: 'Learning & Education',
    icon: Icons.learning,
    description: 'Workshops, skill sharing, study groups',
    examples: ['Workshops', 'Skills', 'Study groups'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor Adventures',
    icon: Icons.outdoor,
    description: 'Hiking, picnics, nature exploration',
    examples: ['Hiking', 'Picnics', 'Nature'],
  },
  {
    id: 'nightlife',
    name: 'Nightlife & Entertainment',
    icon: Icons.nightlife,
    description: 'Parties, clubs, evening entertainment',
    examples: ['Parties', 'Clubs', 'Entertainment'],
  },
  {
    id: 'community',
    name: 'Community Building',
    icon: Icons.community,
    description: 'Local initiatives, neighborhood events',
    examples: ['Local events', 'Initiatives', 'Neighbors'],
  },
];
