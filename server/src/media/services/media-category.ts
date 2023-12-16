import { Category } from '../entities'

async function getMediaCategories() {
    try {
        const mediaCategories: Array<Category> = await Category.find();
        return mediaCategories;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error :', error)
        throw error
    }
}

async function createCategory(category: Category) {
    try {
        const createdCategory: Category = await new Category(category).save()
        return createdCategory
    } catch (err: any) {
        if (err.code == 'ER_DUP_ENTRY') {
            // eslint-disable-next-line no-console
            console.log('Error :', err)
            throw 'Duplicate entry for category'
        }
        // eslint-disable-next-line no-console
        console.log('Error :', err)
        throw err
    }
}

export { getMediaCategories, createCategory }