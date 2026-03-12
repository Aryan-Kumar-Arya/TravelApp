interface Trip {
  id: string;
  user_id: string;
  destination_city: string;
  start_date: string; // ISO Date YYYY-MM-DD
  end_date: string;   // ISO Date YYYY-MM-DD
}

export interface User {
  id: string;
  name: string;
  trips: Trip[];
  home_city?: string;
}

/**
 * Filter the potential matches (Free Stack / Global Nomad) based on overlapping trip dates and destinations.
 */
export function getOverlapTravelers(
  currentUserTrip: Trip,
  potentialMatches: User[]
): User[] {
  const currentStart = new Date(currentUserTrip.start_date).getTime();
  const currentEnd = new Date(currentUserTrip.end_date).getTime();

  return potentialMatches.filter((user) => {
    // Find any trip of the potential match that overlaps with the user's trip in the same city
    const overlappingTrip = user.trips.find((trip) => {
      // Must be same destination city
      if (trip.destination_city !== currentUserTrip.destination_city) {
        return false;
      }

      const matchStart = new Date(trip.start_date).getTime();
      const matchEnd = new Date(trip.end_date).getTime();

      // Check for date overlap: 
      // (Start A <= End B) and (End A >= Start B)
      const isOverlapping = currentStart <= matchEnd && currentEnd >= matchStart;
      return isOverlapping;
    });

    return !!overlappingTrip;
  });
}
