;var Solid = Solid || {};
Solid.SqlEditor = Solid.SqlEditor || {};

Solid.SqlEditor.SqlQueryDefinition = (function($, sld) {
    var defn = function() {
    };

    defn.prototype.getParameters = function(sql) {
        var regex = /\{{2}\s*((\w|\:)+)\s*\}{2}/g;
        var match;
        var params = [];
        do {
            match = regex.exec(sql);
            if (match) {
                //var fullMatch = match[0];
                var content = match[1];
                params.push(new sld.SqlEditor.SqlParameter(content));
            }
        } while (match);

        return params;
    };

    return defn;
})(jQuery, Solid);