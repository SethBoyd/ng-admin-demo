export default function (nga) {

    var commands = nga.entity('commands');
    commands.listView()
        .sortField('date')
        .sortDir('DESC')
        .fields([
            nga.field('date', 'datetime'),
            nga.field('reference').isDetailLink(true),
            nga.field('customer_id', 'reference')
                .label('Customer')
                .targetEntity(nga.entity('customers'))
                .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name)),
            nga.field('nb_items')
                .map((v,e) => e.basket.length),
            nga.field('total', 'amount'),
            nga.field('status'),
            nga.field('returned', 'boolean')
        ])
        .filters([
            nga.field('q', 'template')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('customer_id', 'reference')
                .label('Customer')
                .targetEntity(nga.entity('customers'))
                .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
                .remoteComplete(true, {
                    searchQuery: function(search) { return { q: search }; }
                }),
            nga.field('status', 'choice')
                .choices([
                    { label: 'ordered', value: 'ordered' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' }
                ]),
            nga.field('returned', 'boolean')
        ])
        .listActions(['<ma-edit-button entry="::entry" entity="::entity" size="xs" label="Details"></ma-edit-button>']);
    commands.editionView()
        .title('Command #{{ entry.values.reference }}')
        .fields([
            nga.field('date', 'datetime')
                .editable(false),
            nga.field('customer_id', 'reference')
                .label('Customer')
                .targetEntity(nga.entity('customers'))
                .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
                .editable(false),
            nga.field('Items', 'template')
                .template('<basket command="entry.values"></basket>'),
            nga.field('status', 'choice')
                .choices([
                    { label: 'ordered', value: 'ordered' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' }
                ])
                .cssClasses('col-sm-4 col-lg-2'),
            nga.field('returned', 'boolean')
        ])

    return commands;
}
