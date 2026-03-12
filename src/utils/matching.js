/**
 * Calculate the number of overlapping days between two date ranges.
 * @param {string} startA - ISO date string YYYY-MM-DD
 * @param {string} endA   - ISO date string YYYY-MM-DD
 * @param {string} startB - ISO date string YYYY-MM-DD
 * @param {string} endB   - ISO date string YYYY-MM-DD
 * @returns {number} Number of overlapping days (0 if no overlap)
 */
export function calculateOverlapDays(startA, endA, startB, endB) {
    const a0 = new Date(startA).getTime();
    const a1 = new Date(endA).getTime();
    const b0 = new Date(startB).getTime();
    const b1 = new Date(endB).getTime();

    const overlapStart = Math.max(a0, b0);
    const overlapEnd = Math.min(a1, b1);

    if (overlapStart > overlapEnd) return 0;

    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((overlapEnd - overlapStart) / msPerDay) + 1;
}

/**
 * Filter potential traveler matches based on overlapping trip dates & same destination city.
 * @param {object} currentTrip - { destination_city, start_date, end_date }
 * @param {Array} potentialMatches - Array of user objects, each with a `trips` array
 * @returns {Array} Filtered users with an added `overlapDays` and `overlapDates` field
 */
export function getOverlapTravelers(currentTrip, potentialMatches) {
    const results = [];

    for (const user of potentialMatches) {
        const matchingTrips = (user.trips || []).filter(
            (trip) => trip.destination_city === currentTrip.destination_city
        );

        for (const trip of matchingTrips) {
            const days = calculateOverlapDays(
                currentTrip.start_date,
                currentTrip.end_date,
                trip.start_date,
                trip.end_date
            );

            if (days > 0) {
                // Calculate the actual overlap window for display
                const overlapStart = new Date(
                    Math.max(
                        new Date(currentTrip.start_date).getTime(),
                        new Date(trip.start_date).getTime()
                    )
                );
                const overlapEnd = new Date(
                    Math.min(
                        new Date(currentTrip.end_date).getTime(),
                        new Date(trip.end_date).getTime()
                    )
                );

                const formatDate = (d) =>
                    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                results.push({
                    ...user,
                    overlapDays: days,
                    overlapDates: `${formatDate(overlapStart)} – ${formatDate(overlapEnd)}`,
                    matchedTrip: trip,
                });
                break; // One matching trip per user is enough
            }
        }
    }

    // Sort by most overlap days first
    results.sort((a, b) => b.overlapDays - a.overlapDays);
    return results;
}
