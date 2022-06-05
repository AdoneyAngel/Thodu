import loadTasksCategories from './components/loadTasksCategories'

test('LoadTasksCategories', () => { 
    loadTasksCategories('gSHrGf9lTz5NMKgIJjRu').then(res => {
        console.log(res)
    })
 })