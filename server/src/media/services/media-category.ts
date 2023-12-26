import { Category } from '../entities'
import { CategoryType } from '../types'

async function getMediaCategories() {
    try {
        const mediaCategories: Array<CategoryType> = await Category.find();
        return mediaCategories;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error :', error)
        throw error
    }
}

async function createCategory(category: CategoryType) {
    try {
        const createdCategory: CategoryType = await new Category(category).save()
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

async function alterCategory(id: number, type: string) {
    try {
        if (!type){
            throw 'Req body incomplete'
        }
        const existingCategory: CategoryType | null = await Category.findOneBy({ id })
        
        if (!existingCategory) {
            throw 'Category Not Found'
        }

        // Update the Category
        await Category.createQueryBuilder()
            .update(Category)
            .set({type})
            .where('id = :id', { id: id })
            .execute()

        const updatedCategory = await Category.findOneBy({ id })
        return updatedCategory
    } catch (err) {
         // eslint-disable-next-line no-console
         console.error('Error updating media:', err)
         throw err
    }
}

export { getMediaCategories, createCategory, alterCategory }