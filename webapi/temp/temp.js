

// const m2s = require('mongoose-to-swagger');

// const swaggerSchema = m2s(user);
// console.log(swaggerSchema);



// create a schema
/**
 * @swagger
 * definition:
 *   users:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

  // app.post('/authenticate', function (req, res) {
  //   // find the user
  //   user.findOne({
  //     name: 'Fuwei'
  //   }, function (err, user) {

  //     if (err) throw err;

  //     if (!user) {
  //       res.json({ success: false, message: 'Authentication failed. User not found.' });
  //     } else if (user) {

  //       // check if password matches
  //       // if (user.password != '123456') {
  //       //   res.json({ success: false, message: 'Authentication failed. Wrong password.' });
  //       // } else 
  //       {

  //         // if user is found and password is right
  //         // create a token with only our given payload
  //         // we don't want to pass in the entire user since that has the password
  //         const payload = {
  //           admin: user.admin
  //         };
  //         var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

  //         // return the information including token as JSON
  //         res.json({
  //           success: true,
  //           message: 'Enjoy your token!',
  //           token: token
  //         });
  //       }

  //     }

  //   });
  // });


  // /**
  //  * @swagger
  //  *
  //  * /login:
  //  *   post:
  //  *     description: Login to the application
  //  *     produces:
  //  *       - application/json
  //  *     parameters:
  //  *       - name: username
  //  *         description: Username to use for login.
  //  *         in: formData
  //  *         required: true
  //  *         type: string
  //  *       - name: password
  //  *         description: User's password.
  //  *         in: formData
  //  *         required: true
  //  *         type: string
  //  *     responses:
  //  *       200:
  //  *         description: login
  //  */
  // app.post('/login', (req, res) => {
  //   // Your implementation comes here ...
  // });