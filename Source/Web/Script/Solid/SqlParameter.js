;var Solid = Solid || {};
Solid.SqlEditor = Solid.SqlEditor || {};


Solid.SqlEditor.SqlParameter = (function () {
    var parameter = function (definition) {
        var parts = definition.split(':');
        var name = parts[0];
        var type = 'string';
        if (parts.length > 1) {
            type = parts[1];
        }

        this.getName = function () { return name; };
        this.getType = function () { return type; };
    };

    parameter.prototype.equals = function (obj) {
        /*Make sure the object is of the same type as this*/
        if (typeof obj !== typeof this) {
            return false;
        }
        return this.getName() === obj.getName() && this.getType() === obj.getType();
    };

    parameter.prototype.toData = function () {
        return {
            Name: this.getName(),
            Type: this.getType()
        };
    };

    return parameter;
})();
