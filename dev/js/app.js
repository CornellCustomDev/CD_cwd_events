import LocalList from "./localist"

const eventListings = document.getElementsByClassName('events-listing');
for (var i = 0; i < eventListings.length; i++) {
    const elem = eventListings[i];
    const settings = {
        'target': elem.dataset.target,
        'format':elem.dataset.format,
        'entries':elem.dataset.entries,
        'heading': elem.dataset.heading,
        'addCal': elem.dataset.addCal,
        'keyword':elem.dataset.keyword,
        'pref_excerpt_length' : elem.dataset.prefExcerptLength,
        'pref_category_filters' : elem.dataset.prefCategoryFilters,
    };
    let LL = new LocalList(settings);
    LL.renderEvents();
}
