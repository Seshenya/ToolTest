import { Review } from '../entities'

async function getProductReviews(product_id: number) {
    try {
        const productReviews = await Review.find({
            where: { product_id },
            relations: ['reviewedByUser'],
        })
         // Calculate average rating and total number of votes for each rounded rating value
         const ratingsSummary = productReviews.reduce(
            (accumulator, review) => {

                if (review.rating === null) {
                    return accumulator;
                }

                const roundedRating = Math.round(Number(review.rating));
                
                accumulator.total += Number(review.rating);
                accumulator.count++;

                // Update total and count for the rounded rating
                if (!accumulator.ratingCounts[roundedRating]) {
                    accumulator.ratingCounts[roundedRating] = 1;
                } else {
                    accumulator.ratingCounts[roundedRating]++;
                }

                // Count non-null descriptions
                if (review.description !== null) {
                    accumulator.totalReviews++;
                }

                return accumulator;
            },
            { total: 0, count: 0, ratingCounts: {}, totalReviews: 0 } as {
                total: number;
                count: number;
                ratingCounts: Record<number, number>;
                totalReviews: number;
            }
        );

        // Calculate average rating
        const averageRating = ratingsSummary.count === 0
            ? 0
            : ratingsSummary.total / ratingsSummary.count;

        return {
            productReviews,
            averageRating,
            totalReviews: ratingsSummary.totalReviews,
            totalRatings: ratingsSummary.count,
            ratingCounts: ratingsSummary.ratingCounts,
        };
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log('Error :', err)
        throw err
    }
}

export { getProductReviews }
