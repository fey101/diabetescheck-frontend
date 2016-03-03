(function (angular) {
    "use strict";

    angular.module("dbcheck.common.queryAdapter", [
        "dbcheck.common.adapter.utils"
    ])

    .service("queryAdapter", ["dbcheck.common.adapter.utils",
        function (utils) {
            /**
             * Make a GET request to fetch all items on the backend
             * @return {promise}
             */
            var getData = function(resource, query_param) {
                return resource.findAll(
                    query_param || {},
                    {
                        bypassCache: true
                    }
                );
            };

            /**
             * Make a POST request to create an item on the backend
             * @return {promise}
             */
            var createData = function (resource, data) {
                /**
                 * @args - resource {Resource} to specify the item being created
                 *       - data {object} the data from which to create the item
                 */
                utils.guaranteeValidResource(resource);
                utils.guaranteeValidObject(data);

                return resource.create(data);
            };

            /**
             * Make a:
             *     PUT request to update all the fields
             *     PATCH request to update specific field(s)
             * ...of an item on the backend
             * @return {promise}
             */
            var updateData = function (resource, id, data, method) {
                /**
                 * @args - resource {Resource} to specify the item being created
                 *       - id {string || number} primary key for the item to
                 *         update
                 *       - data {object} the data from which to create the item
                 *       - method {string} method to use while updating, either
                 *         'PUT' or 'PATCH'
                 */
                utils.guaranteeValidResource(resource);
                utils.guaranteeValidId(id);
                utils.guaranteeValidObject(data);
                utils.guaranteeValidString(method);

                return resource.update(id, data, {method: method});
            };

            /**
             * Make a DELETE request to destroy an item on the backend
             * @return {promise}
             */
            var deleteData = function (resource, id) {
                /**
                 * @args - resource {Resource} to specify the item being created
                 *       - id {string || number} primary key for the item to
                 *         update
                 */
                utils.guaranteeValidResource(resource);
                utils.guaranteeValidId(id);

                return resource.destroy(id);
            };

            return {
                createData: createData,
                deleteData: deleteData,
                getData: getData,
                updateData: updateData
            };
        }
    ]);
})(angular);
