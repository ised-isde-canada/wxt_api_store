(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['api-listing'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[0][0]) != null ? stack1.apis : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr class=\"col-xs-12 col-sm-6 col-md-4 api-row\">\r\n          <td class=\"api api--hidden\"><a class=\"api-link js-api-link\" href=\""
    + alias4(((helper = (helper = helpers.humanUrl || (depth0 != null ? depth0.humanUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"humanUrl","hash":{},"data":data}) : helper)))
    + "\">\r\n            <div class=\"api-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n            <div class=\"api-description\"><div>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div></div>\r\n            <div class=\"api-owner\">\r\n              <hr />\r\n              "
    + alias4(container.lambda(((stack1 = blockParams[1][0]) != null ? stack1.description : stack1), depth0))
    + "\r\n            </div>\r\n\r\n            <div class=\"overlay js-overlay\"></div>\r\n          </a>\r\n        </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "  <table id=\"apis\" class=\"apis ised-tables tbl-gridify\" data-wb-tables='{\"ordering\": false, \"bPaginate\" : false}'>\r\n    <caption class=\"wb-inv\">\r\n      APIs\r\n    </caption>\r\n\r\n    <thead>\r\n      <tr>\r\n        <th>API</th>\r\n      </tr>\r\n    </thead>\r\n\r\n    <tbody class=\"row wb-eqht\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </tbody>\r\n  </table>";
},"useData":true,"useBlockParams":true});
})();