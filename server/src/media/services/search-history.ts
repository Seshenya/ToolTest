import { SearchHistory } from "../../user/entities";


async function getSearchHistory(user_id: number) {
  if (user_id === undefined) {
    console.error('User ID is undefined.');
    return ''
  }

  try {
    const searchHistoryData = await SearchHistory.findOneBy({
        user_id,
    })

    if (!searchHistoryData) {
      return ''
    }

    const searchHistory = searchHistoryData.search_history;

    if (!searchHistory) {
      return ''
    }

    const words = searchHistory.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = new Map();

    for (const word of words) {
      const count = wordCount.get(word) || 0;
      wordCount.set(word, count + 1);
    }

    const sortedWordCount = Array.from(wordCount.entries()).sort((a, b) => b[1] - a[1]);
    const topSearchList = sortedWordCount.slice(0, 10).map(([word]) => word);
    const topSearch = topSearchList.join(', ');

    console.log('topSearch',topSearch)
    return topSearch;

  } catch (err) {
      console.error('Error:', err);
      throw err;
  }
}

async function updateSearchHistory(user_id: number, query: string) {
  if (user_id !== undefined) {
    try {
      const searchHistory = await SearchHistory.findOneBy({
          user_id,
      })
  
      if (!searchHistory) {
          try {
              const newSearchHistory = new SearchHistory()
  
              newSearchHistory.user_id = user_id
              newSearchHistory.search_last_updated = new Date();
              newSearchHistory.cron_last_run_time = new Date();
              newSearchHistory.search_history = query
              
              newSearchHistory.save()
  
          } catch(error) {
            throw new Error(`Error Creating Search History found for user '${user_id}'`);
          }
      }
  
      // Check if search_history is null or undefined
      let updatedSearchHistory = searchHistory?.search_history || '';
  
      if (updatedSearchHistory !== '') {
        updatedSearchHistory += ', ';
      }
  
      updatedSearchHistory += query;
  
      const now = new Date();
  
      // Update search history
      await SearchHistory.createQueryBuilder()
        .update(SearchHistory)
        .set({ search_history: updatedSearchHistory, search_last_updated: now })
        .where('user_id = :user_id', { user_id: user_id })
        .execute()
  
      // fill the code here
  
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
  }
}

export { getSearchHistory, updateSearchHistory }