export default function (nga) {

    var categories = nga.entity('categories');
    categories.listView()
        .fields([
            nga.field('name'),
        ])
        .listActions(['<ma-filtered-list-button entity-name="products" filter="{ category_id: entry.values.id }" size="xs" label="Related products"></ma-filtered-list-button>', 'edit', 'delete']);
    categories.creationView()
        .fields([
            nga.field('name'),
            nga.field('', 'template')
                .label('')
                .template('<span class="pull-right"><ma-filtered-list-button entity-name="products" filter="{ category_id: entry.values.id }" size="sm"></ma-filtered-list-button></span>')

        ]);
    categories.editionView()
        .fields(categories.creationView().fields());

    return categories;
}
