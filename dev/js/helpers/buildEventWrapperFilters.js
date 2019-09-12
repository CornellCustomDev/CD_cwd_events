import {
    getGroupName,
    getGroupId,
} from './displayEvent';
/**
 * @todo add support for array of departments, and types.
 * @param {obj} event The localist event.
 */
const buildEventWrapperFilters = (events, filterby) => {
    const filters = {}
    events.map( eventObj => {
        const event = eventObj.event
        const group_name = getGroupName(event);
        const group_id = getGroupId(event);
        if (
            filterby === 'type' &&
            event.filters.event_types
        ) {
            const types = event.filters.event_types
            types.forEach( type =>{
                filters[type.name] = {
                    id: type.id,
                    name: type.name,
                    filterby: filterby
                };
            })

        } else if (
            filterby === 'dept' &&
            event.filters.departments
        ) {
            const departments = event.filters.departments
            departments.forEach( department => {
                filters[department.name] = {
                    id: department.id,
                    name: department.name,
                    filterby: filterby
                };
            })
        } else if (
            filterby === 'group' &&
            group_name !== ''
        ) {
            filters[group_name] = {
                id: group_id,
                name: group_name,
                filterby: filterby
            };
        }
    })
    return filters

};

export default buildEventWrapperFilters
