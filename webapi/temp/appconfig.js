var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  // create a schema. This will contain all object we need for the client to create the app.
  var appConfigSchema = new Schema({
    appName: String,
    appLogo: String, // Store Base64 string
    defaultLanguage: String, // The default lanuage
    // https://github.com/umarovt/react-sidemenu
    leftMenu: {
      items: {
        value: String, // This is the link where you will be redirected after you click the item or the value attribute inside method onMenuItemClick
        label: String, // This is the representative value of the item
        label_text_resid: String, // The real display id
        icon: String,  // This is the representative icon of the item. It should be font-awesome class name.
        onClick: String, //	Custom on click method specific for this item (overrides onMenuItemClick).
        extras: Schema.Types.Mixed, //	Container for additional data. (Not required)
      },
      collapse: Boolean, // Default	true	This property gives you the capability to enable or disable collapsing menu when other elements of the menu are clicked.
      theme: String, //	'default'	This sets a class for the component that you can use to apply custom styling. The class will be Side-menu-[theme_name]. Note: our default theme uses Font Awesome icons. See demo for an detailed example.
      // renderMenuItemContent({ icon: icon, value: value, label: label })	null	This property enables you to provide a custom render method for items. Function is passed one parameter, representing the menu item being rendered. It receives an object with attributes: icon, label and value. Demo
      // onMenuItemClick	(value, extras) => window.location.href = '#' + value	This property enables you to provide custom onClick method for items. The function gets passed one parameter which is the value of the clicked item. If you do not provide an onMenuItemClick. Demo
      // rtl	false	This property enables you to use the sidemenu in a right-to-left page. Example
      // shouldTriggerClickOnParents	false	This property enables triggering 'onMenuItemClick' on parent items that have children.

    }
  }, { collection: 'appconfig' });
  // the schema is useless so far
  // we need to create a model using it
  var AppConfig = mongoose.model('appconfig', appConfigSchema);


module.exports = function(app){


/**
 * @swagger
 * /api/common/appconfig:
 *   get:
 *     tags:
 *       - appconfig
 *     description: Returns all appconfig
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of appconfig
 *         schema:
 *           $ref: '#/definitions/appconfig'
 */
  app.get('/appconfig', function (req, res) {
    AppConfig.find({}, function (err, appConfigs) {
        if (err) throw err;
        // object of all the appconfig

        res.json(appConfigs)
    });
})



}