﻿define([
    "text!templates/Opportunities/compactContentTemplate.html",
    'views/Opportunities/EditView',
    'models/OpportunitiesModel'
],
    function (compactContentTemplate, editView, currentModel) {
        var compactContentView = Backbone.View.extend({
			className:"form",

            initialize: function (options) {
            	this.personsCollection = (options && options.personsCollection) ? options.personsCollection : null;
            },

            events: {
                "click p > a": "goToEditDialog"
            },

            template: _.template(compactContentTemplate),

            goToEditDialog: function (e) {
                var id = $(e.target).closest("a").attr("id");
                var model = new currentModel({ validate: false });

                e.preventDefault();

                model.urlRoot = '/Opportunities/form';
                model.fetch({
                    data: { id: id },
                    success: function (model) {
                        new editView({
                            model: model,
                            elementId: 'personAttach'
                        });
                    },
                    error: function () { alert('Please refresh browser'); }
                });
            },

            gotoOpportunitieForm: function (e) {
                var itemIndex = $(e.target).closest("a").attr("id");

                e.preventDefault();

                window.location.hash = "#easyErp/Opportunities/form/" + itemIndex;
            },

            render: function (options) {
                this.$el.html(this.template({
                    collection: this.collection,
					options: options
                }));

                return this;
            }
        });

        return compactContentView;
    });
