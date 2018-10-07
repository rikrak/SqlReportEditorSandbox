; (function ($, Solid, window, document, undefined) {

    var arrayContains = function (array, obj) {
        var i = array.length;
        while (i--) {
            if ((obj.equals !== undefined) && (array[i].equals !== undefined)) {
                if (array[i].equals(obj)) {
                    return true;
                }
            } else if (array[i] === obj) {
                return true;
            }
        }
        return false;
    };

    // Create the defaults once
    var pluginName = "ParameterGrid",
        defaults = {
            //propertyName: "value"
        };

    // The actual plugin constructor
    function ParameterGrid(element, options) {
        var grid;
        var self = this;
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        var removeRowsNotIn = function(dataToKeep) {
            var ds = grid.dataSource.data();
            var dataToRemove = [];
            for (var dsj = 0; dsj < ds.length; dsj++) {
                var datum = ds[dsj];
                var paramFromGrid = new Solid.SqlEditor.SqlParameter(datum.Name + ':' + datum.Type);

                if (arrayContains(dataToKeep, paramFromGrid) === false) {
                    dataToRemove.push(datum);
                }
            }
            for (var dsk = 0; dsk < dataToRemove.length; dsk++) {
                grid.dataSource.remove(dataToRemove[dsk]);
            }
        };

        var addNewRows = function(data) {
            for (var i = 0; i < data.length; i++) {
                var ds = grid.dataSource.data();
                var doAdd = true;
                var sqlParam = data[i];

                for (var dsi = 0; dsi < ds.length; dsi++) {
                    var datum = ds[dsi];
                    var paramFromGrid = new Solid.SqlEditor.SqlParameter(datum.Name + ':' + datum.Type);
                    if (paramFromGrid.equals(sqlParam) === true) {
                        doAdd = false;
                        break;
                    }
                }
                if (doAdd === true) {
                    grid.dataSource.insert(sqlParam.toData());
                }
            }

        };

        this.setData = function(data) {
            removeRowsNotIn(data);
            addNewRows(data);
            grid.refresh();
        };

        var init = function() {
            var parametersDs = {
                schema: {
                    model: {
                        fields: {
                            Name: { type: "string" },
                            Type: { type: "string" }
                        }
                    }
                }
            };

            $(self.element).kendoGrid({
                dataSource: parametersDs,
                height: 200,
                scrollable: true,
                sortable: true,
                filterable: false,
                columns: [
                    "Name",
                    "Type"
                ]
            });

            grid = $(self.element).data('kendoGrid');
        };

        init();
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName,
                    new ParameterGrid(this, options));
            }
        });
    };

})(jQuery, Solid, window, document);