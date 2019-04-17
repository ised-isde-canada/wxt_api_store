(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['subscriptions'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = (helpers.ifSubscribedToTenant || (depth0 && depth0.ifSubscribedToTenant) || helpers.helperMissing).call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.applications : stack1)) != null ? stack1.applications : stack1),{"name":"ifSubscribedToTenant","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.applications : stack1)) != null ? stack1.applications : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "          <tr>\r\n            <td style=\"font-weight: bold\" colspan=\"5\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[1][0]) != null ? stack1.description : stack1), depth0))
    + "</td>\r\n          </tr>\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing;

  return "          <tr class=\"odd\">\r\n            <td>\r\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.application : stack1)) != null ? stack1.links : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "            </td>\r\n\r\n            <td>"
    + alias3(alias2(((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.application : stack1)) != null ? stack1.apiname : stack1), depth0))
    + "</td>\r\n\r\n            <td>"
    + ((stack1 = (helpers.ifIsNotPending || (depth0 && depth0.ifIsNotPending) || alias4).call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.application : stack1)) != null ? stack1.state : stack1),{"name":"ifIsNotPending","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</td>\r\n\r\n            <td>"
    + alias3(alias2(((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.application : stack1)) != null ? stack1.state : stack1), depth0))
    + "</td>\r\n\r\n            <td class=\"nowrap\">"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias4).call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.application : stack1)) != null ? stack1.created_at : stack1),{"name":"formatDate","hash":{},"data":data,"blockParams":blockParams}))
    + "</td>\r\n          </tr>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = (helpers.ifSelfLink || (depth0 && depth0.ifSelfLink) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],{"name":"ifSelfLink","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "              <a href=\""
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? stack1.href : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = ((stack1 = blockParams[2][0]) != null ? stack1.application : stack1)) != null ? stack1.name : stack1), depth0))
    + "</a>  \r\n";
},"8":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1.application : stack1)) != null ? stack1.user_key : stack1), depth0));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"table-responsive\">\r\n  <table class=\"table panel panel-default\">\r\n      <thead class=\"panel-heading\">\r\n        <tr>\r\n          <th>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"subscriptions.subscription",{"name":"i18n","hash":{},"data":data,"blockParams":blockParams}))
    + "</th>\r\n          <th>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"subscriptions.apiTitle",{"name":"i18n","hash":{},"data":data,"blockParams":blockParams}))
    + "</th>\r\n          <th>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"subscriptions.key",{"name":"i18n","hash":{},"data":data,"blockParams":blockParams}))
    + "</th>\r\n          <th>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"subscriptions.status",{"name":"i18n","hash":{},"data":data,"blockParams":blockParams}))
    + "</th>\r\n          <th>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"subscriptions.createdDate",{"name":"i18n","hash":{},"data":data,"blockParams":blockParams}))
    + "</th>\r\n        </tr>\r\n      </thead>\r\n\r\n      <tbody class=\"panel-body\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tenants : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "      </tbody>\r\n  </table>\r\n</div>\r\n";
},"useData":true,"useBlockParams":true});
})();