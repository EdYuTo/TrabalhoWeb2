/**
 * Created by Abe on 31/05/2018.
 */
$(document).ready(function() {
    YUI().use(
        'aui-datepicker',
        function(Y) {
            new Y.DatePicker(
                {
                    trigger: 'textarea',
                    mask: '%m/%d/%y',
                    calendar: {
                        selectionMode: 'multiple'
                    },
                    popover: {
                        zIndex: 1
                    },
                    panes: 2
                }
            );
        }
    );

});