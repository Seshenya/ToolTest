import { SearchHistory } from "../../user/entities";

async function removeOldSearchHistoryBatched() {
  try {
    console.log("Remove User Old Search Histry Cron Executed")

    const weekInMillis = 7 * 24 * 60 * 60 * 1000 * 1000; // One week in milliseconds

    let usersToRemoveHistory;
    const batchSize = 30;

    do {
      // Fetch a batch of users
      usersToRemoveHistory = await SearchHistory.createQueryBuilder('search_history')
        .where('TIMESTAMPDIFF(MICROSECOND, search_history.cron_last_run_time, search_history.search_last_updated) > :week', { week: weekInMillis })
        .take(batchSize)
        .getMany();

      console.log('usersToRemoveHistory:' ,usersToRemoveHistory)
      // Process the batch
      for (const userSearchHistory of usersToRemoveHistory) {

        const searchHistory = userSearchHistory.search_history
        let updatedSearchHistory = searchHistory;

        if (searchHistory.length > 100) {
          // Get the last 100 characters (words) in the searchHistory
          updatedSearchHistory = searchHistory
          .split(',')
          .slice(-100)
          .join(',');
        }

        // Update the database with the new search_history and cron_last_run_time
        await SearchHistory.createQueryBuilder()
          .update(SearchHistory)
          .set({ search_history: updatedSearchHistory, cron_last_run_time: new Date() })
          .where('user_id = :user_id', { user_id: userSearchHistory.user_id })
          .execute();
      }

    } while (usersToRemoveHistory.length > 0);

    console.log('Old search history removed for eligible users.');

  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

export { removeOldSearchHistoryBatched }
